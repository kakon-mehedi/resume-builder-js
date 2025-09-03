import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import CVBuilder from './pages/CVBuilder';
import Dashboard from './pages/Dashboard';
import AuthProvider from './contexts/AuthContext';

function App() {
	return (
		<AuthProvider>
			<Router>
				<div className='App'>
					<Toaster position='top-right' />
					<Routes>
						<Route
							path='/'
							element={<CVBuilder />}
						/>
						<Route
							path='/dashboard'
							element={<Dashboard />}
						/>
						<Route
							path='/builder/:id?'
							element={<CVBuilder />}
						/>
					</Routes>
				</div>
			</Router>
		</AuthProvider>
	);
}

export default App;
