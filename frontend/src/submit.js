import { useState } from 'react';
import { useStore } from './store';
import { shallow } from 'zustand/shallow';

const ResultModal = ({ isOpen, onClose, data }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h2 className="modal-title">Pipeline Analysis</h2>
                
                <div className="modal-stats">
                    <div className="modal-stat-card">
                        <span className="modal-stat-label">Nodes</span>
                        <span className="modal-stat-value">{data.numNodes}</span>
                    </div>
                    <div className="modal-stat-card">
                        <span className="modal-stat-label">Edges</span>
                        <span className="modal-stat-value">{data.numEdges}</span>
                    </div>
                    
                    <div className="modal-dag-status">
                        <span className="modal-dag-icon">
                            {data.isDag ? '✅' : '⚠️'}
                        </span>
                        <span className="modal-dag-text">
                            {data.isDag ? 'Pipeline is a valid DAG' : 'Pipeline contains cycles'}
                        </span>
                    </div>
                </div>

                <button className="modal-close-btn" onClick={onClose}>
                    Close
                </button>
            </div>
        </div>
    );
};

export const SubmitButton = () => {
    const { nodes, edges } = useStore(
        (state) => ({
            nodes: state.nodes,
            edges: state.edges,
        }),
        shallow
    );

    const [modalData, setModalData] = useState(null);

    const handleSubmit = async () => {
        // 1. Calculate basic stats
        const numNodes = nodes.length;
        const numEdges = edges.length;

        // 2. Check if DAG (Frontend)
        const isDag = () => {
            const adj = {};
            nodes.forEach(node => adj[node.id] = []);
            edges.forEach(edge => {
                if (adj[edge.source]) {
                    adj[edge.source].push(edge.target);
                }
            });

            const visited = new Set();
            const recursionStack = new Set();

            const dfs = (nodeId) => {
                visited.add(nodeId);
                recursionStack.add(nodeId);

                const neighbors = adj[nodeId] || [];
                for (const neighbor of neighbors) {
                    if (!visited.has(neighbor)) {
                        if (dfs(neighbor)) return true;
                    } else if (recursionStack.has(neighbor)) {
                        return true;
                    }
                }

                recursionStack.delete(nodeId);
                return false;
            };

            for (const node of nodes) {
                if (!visited.has(node.id)) {
                    if (dfs(node.id)) return false; // Cycle detected
                }
            }
            return true;
        };

        const isPipelineDag = isDag();

        // 3. Backend Integration
        try {
            const formData = new FormData();
            formData.append('pipeline', JSON.stringify({ nodes, edges }));
            
            await fetch('http://127.0.0.1:8000/pipelines/parse', {
                method: 'POST',
                body: formData,
            });
        } catch (error) {
            console.warn('Backend integration check failed:', error);
        }

        // 4. Show Modal
        setModalData({
            numNodes,
            numEdges,
            isDag: isPipelineDag
        });
    };

    return (
        <>
            <div className="submit-container">
                <button type="submit" className="submit-button" onClick={handleSubmit}>Submit</button>
            </div>
            <ResultModal 
                isOpen={!!modalData} 
                onClose={() => setModalData(null)} 
                data={modalData || {}} 
            />
        </>
    );
}
