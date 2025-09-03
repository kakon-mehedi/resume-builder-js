const express = require('express');
const router = express.Router();
const puppeteer = require('puppeteer');
const path = require('path');

// Generate PDF from CV data
router.post('/generate', async (req, res) => {
  try {
    const { cvData, template = 'modern' } = req.body;
    
    // Generate HTML content
    const htmlContent = generateHTMLFromCV(cvData, template);
    
    // Launch puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Set content and wait for it to load
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
    
    // Generate PDF
    const pdf = await page.pdf({
      format: 'A4',
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
      },
      printBackground: true
    });
    
    await browser.close();
    
    // Set headers for PDF download
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${cvData.personalInfo.name || 'CV'}.pdf"`,
      'Content-Length': pdf.length
    });
    
    res.send(pdf);
  } catch (error) {
    console.error('PDF generation error:', error);
    res.status(500).json({ message: 'Failed to generate PDF' });
  }
});

// Function to generate HTML from CV data
function generateHTMLFromCV(cvData, template) {
  const skillCategories = [
    { key: 'frontend', label: 'Frontend' },
    { key: 'backend', label: 'Backend' },
    { key: 'database', label: 'Database' },
    { key: 'tools', label: 'Tools & DevOps' },
    { key: 'other', label: 'Other' }
  ];
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <style>
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        body {
          font-family: Calibri, sans-serif;
          font-size: 11pt;
          line-height: 1.2;
          color: #000;
        }
        
        .header {
          text-align: center;
          margin-bottom: 15px;
          border-bottom: 1px solid #ccc;
          padding-bottom: 10px;
        }
        
        .name {
          font-size: 18pt;
          font-weight: bold;
          margin-bottom: 5px;
        }
        
        .contact {
          font-size: 10pt;
          color: #666;
        }
        
        .section {
          margin-bottom: 12px;
        }
        
        .section-title {
          font-size: 14pt;
          font-weight: bold;
          text-transform: uppercase;
          border-bottom: 1px solid #000;
          margin-bottom: 6px;
          padding-bottom: 2px;
        }
        
        .job-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 3px;
        }
        
        .job-title {
          font-weight: bold;
        }
        
        .duration {
          font-style: italic;
          font-size: 10pt;
        }
        
        .bullets {
          margin-left: 15px;
          margin-bottom: 8px;
        }
        
        .bullets li {
          margin-bottom: 2px;
        }
        
        .skills-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        
        .skills-category {
          margin-bottom: 4px;
        }
        
        .skills-label {
          font-weight: bold;
        }
        
        .project-header {
          font-weight: bold;
          margin-bottom: 2px;
        }
        
        .tech-stack {
          font-style: italic;
          color: #666;
          font-size: 10pt;
          margin-bottom: 3px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <div class="name">${cvData.personalInfo.name || '[Your Name]'}</div>
        <div class="contact">${[cvData.personalInfo.phone, cvData.personalInfo.email, cvData.personalInfo.location, cvData.personalInfo.linkedin, cvData.personalInfo.github].filter(Boolean).join(' | ')}</div>
      </div>
      
      ${cvData.summary ? `
        <div class="section">
          <div class="section-title">Summary</div>
          <p>${cvData.summary}</p>
        </div>
      ` : ''}
      
      ${Object.values(cvData.skills).some(skills => skills.length > 0) ? `
        <div class="section">
          <div class="section-title">Technical Skills</div>
          <div class="skills-grid">
            ${skillCategories.map(category => 
              cvData.skills[category.key].length > 0 ? `
                <div class="skills-category">
                  <span class="skills-label">${category.label}:</span> ${cvData.skills[category.key].join(', ')}
                </div>
              ` : ''
            ).join('')}
          </div>
        </div>
      ` : ''}
      
      ${cvData.experience.length > 0 ? `
        <div class="section">
          <div class="section-title">Professional Experience</div>
          ${cvData.experience.map(exp => `
            <div style="margin-bottom: 10px;">
              <div class="job-header">
                <div>
                  <span class="job-title">${exp.title}</span>
                  ${exp.company ? ` | <span class="job-title">${exp.company}</span>` : ''}
                </div>
                ${exp.duration ? `<span class="duration">${exp.duration}</span>` : ''}
              </div>
              ${exp.bullets.filter(bullet => bullet.trim()).length > 0 ? `
                <ul class="bullets">
                  ${exp.bullets.filter(bullet => bullet.trim()).map(bullet => `<li>${bullet}</li>`).join('')}
                </ul>
              ` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}
      
      ${cvData.projects.length > 0 ? `
        <div class="section">
          <div class="section-title">Key Projects</div>
          ${cvData.projects.map(project => `
            <div style="margin-bottom: 10px;">
              <div class="project-header">${project.name}</div>
              ${project.techStack ? `<div class="tech-stack">${project.techStack}</div>` : ''}
              ${project.bullets.filter(bullet => bullet.trim()).length > 0 ? `
                <ul class="bullets">
                  ${project.bullets.filter(bullet => bullet.trim()).map(bullet => `<li>${bullet}</li>`).join('')}
                </ul>
              ` : ''}
            </div>
          `).join('')}
        </div>
      ` : ''}
      
      ${(cvData.education.degree || cvData.awards.length > 0) ? `
        <div class="section">
          <div class="section-title">Education & Awards</div>
          ${cvData.education.degree ? `
            <div class="job-header" style="margin-bottom: 8px;">
              <div>
                <span class="job-title">${cvData.education.degree}</span>
                ${cvData.education.university ? ` | ${cvData.education.university}` : ''}
              </div>
              ${cvData.education.duration ? `<span class="duration">${cvData.education.duration}</span>` : ''}
            </div>
          ` : ''}
          ${cvData.awards.filter(award => award.trim()).length > 0 ? `
            <p style="margin-top: 4px;">
              <span class="skills-label">Awards:</span> ${cvData.awards.filter(award => award.trim()).join(' | ')}
            </p>
          ` : ''}
        </div>
      ` : ''}
    </body>
    </html>
  `;
}

module.exports = router;