import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from 'recharts';

function Home() {
    const [patientData, setPatientData] = useState({});
    const [graphData, setGraphData] = useState({
        graph1: [],
        graph2: [],
        graph3: []
    });

    useEffect(() => {
        const socket = io('http://127.0.0.1:5000'); // Connect to the Flask backend

        // Listen for patient data
        socket.on('patient_data', (data) => {
            setPatientData(data);
        });

        // Listen for graph data
        socket.on('graph_data', (data) => {
            setGraphData(data);
        });

        // Clean up the connection when the component unmounts
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <main className='main-container'>
            <div className='main-title'>
                <h3>DASHBOARD</h3>
            </div>

            <div className='main-cards'>
                <div className='card'>
                    <div className='card-inner'>
                        <h4>NAME:</h4>
                    </div>
                    <h4>{patientData.name}</h4>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h4>ID:</h4>
                    </div>
                    <h4>{patientData.id}</h4>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h4>DATE:</h4>
                    </div>
                    <h4>{patientData.date}</h4>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h4>DOCTOR:</h4>
                    </div>
                    <h4>{patientData.doctor}</h4>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h4>SESSION:</h4>
                    </div>
                    <h4>{patientData.session}</h4>
                </div>
                <div className='card'>
                    <div className='card-inner'>
                        <h4>LEG:</h4>
                    </div>
                    <h4>{patientData.leg}</h4>
                </div>
            </div>

            <div className='charts'>
                {/* Graph 1: Right Leg: X-axis */}
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={graphData.graph1} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" label={{ value: 'Time', position: 'bottom' }} />
                        <YAxis label={{ value: 'X-axis Value', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="x" stroke="#8884d8" />
                        <text x="50%" y="5%" textAnchor="middle" dominantBaseline="middle" fontSize={16}>Right Leg: X-axis</text>
                    </LineChart>
                </ResponsiveContainer>

                {/* Graph 2: Right Leg: Y-axis */}
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={graphData.graph2} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" label={{ value: 'Time', position: 'bottom' }} />
                        <YAxis label={{ value: 'Y-axis Value', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="y" stroke="#82ca9d" />
                        <text x="50%" y="5%" textAnchor="middle" dominantBaseline="middle" fontSize={16}>Right Leg: Y-axis</text>
                    </LineChart>
                </ResponsiveContainer>

                {/* Graph 3: Right Leg: Z-axis */}
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={graphData.graph3} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" label={{ value: 'Time', position: 'bottom' }} />
                        <YAxis label={{ value: 'Z-axis Value', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend />
                        <Line type="monotone" dataKey="z" stroke="#ff7300" />
                        <text x="50%" y="5%" textAnchor="middle" dominantBaseline="middle" fontSize={16}>Right Leg: Z-axis</text>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </main>
    );
}

export default Home;
