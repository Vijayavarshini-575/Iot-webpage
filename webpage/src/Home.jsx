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
            setGraphData((prev) => ({
                graph1: [...prev.graph1, ...data.graph1].slice(-10), // Keep only the last 10 points
                graph2: [...prev.graph2, ...data.graph2].slice(-10), // Keep only the last 10 points
                graph3: [...prev.graph3, ...data.graph3].slice(-10)  // Keep only the last 10 points
            }));
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
                    <LineChart data={graphData.graph1} margin={{ top: 30, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" label={{ value: 'Time', position: 'bottom' }} />
                        <YAxis label={{ value: 'Distance', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend
                            content={(props) => {
                                const { payload } = props;
                                return (
                                    <ul>
                                        {payload.map((entry, index) => {
                                            // Hide the 'distance' legend items
                                            if (entry.dataKey === 'distance') {
                                                return null; // Remove legend for distance line
                                            }
                                            return (
                                                <li key={`item-${index}`} style={{ color: entry.color }}>
                                                    {entry.value}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                );
                            }}
                        />
                        <Line type="monotone" dataKey="distance" stroke="#8884d8" />
                        <text x="50%" y="5%" textAnchor="middle" dominantBaseline="middle" fontSize={16}>Right Leg: X-axis</text>
                    </LineChart>
                </ResponsiveContainer>

                {/* Graph 2: Right Leg: Y-axis */}
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={graphData.graph2} margin={{ top: 30, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" label={{ value: 'Time', position: 'bottom' }} />
                        <YAxis label={{ value: 'Distance', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend
                            content={(props) => {
                                const { payload } = props;
                                return (
                                    <ul>
                                        {payload.map((entry, index) => {
                                            // Hide the 'distance' legend items
                                            if (entry.dataKey === 'distance') {
                                                return null; // Remove legend for distance line
                                            }
                                            return (
                                                <li key={`item-${index}`} style={{ color: entry.color }}>
                                                    {entry.value}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                );
                            }}
                        />
                        <Line type="monotone" dataKey="distance" stroke="#82ca9d" />
                        <text x="50%" y="5%" textAnchor="middle" dominantBaseline="middle" fontSize={16}>Right Leg: Y-axis</text>
                    </LineChart>
                </ResponsiveContainer>

                {/* Graph 3: Right Leg: Z-axis */}
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={graphData.graph3} margin={{ top: 30, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="time" label={{ value: 'Time', position: 'bottom' }} />
                        <YAxis label={{ value: 'Distance', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        <Legend
                            content={(props) => {
                                const { payload } = props;
                                return (
                                    <ul>
                                        {payload.map((entry, index) => {
                                            // Hide the 'distance' legend items
                                            if (entry.dataKey === 'distance') {
                                                return null; // Remove legend for distance line
                                            }
                                            return (
                                                <li key={`item-${index}`} style={{ color: entry.color }}>
                                                    {entry.value}
                                                </li>
                                            );
                                        })}
                                    </ul>
                                );
                            }}
                        />
                        <Line type="monotone" dataKey="distance" stroke="#ff7300" />
                        <text x="50%" y="5%" textAnchor="middle" dominantBaseline="middle" fontSize={16}>Right Leg: Z-axis</text>
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </main>
    );
}

export default Home;
