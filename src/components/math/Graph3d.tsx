import { h } from 'preact';
import { useEffect, useRef } from 'preact/hooks';
import { Network } from "vis-network/peer/esm/vis-network";
import { DataSet } from "vis-data/peer/esm/vis-data"
import Vec3 from '../../types/Vec3';

interface GraphProps {
    points: Vec3[];
    size: number;
}

const Graph = ({ points, size }: GraphProps) => {
    const graphContainer = useRef(null);

    useEffect(() => {
        // Define the nodes for the plane (corners of the plane)
        const nodes = new DataSet([
            // Plane corners (4-corner quad plane)
            { id: 1, x: 1, y: 1, z: 0 }, // Top-left corner
            { id: 2, x: 4, y: 1, z: 0 }, // Top-right corner
            { id: 3, x: 4, y: 4, z: 0 }, // Bottom-right corner
            { id: 4, x: 1, y: 4, z: 0 }, // Bottom-left corner

            // Points not part of the plane (with different z values)
            { id: 5, x: 2, y: 2, z: 3 }, // Point above the plane
            { id: 6, x: 3, y: 3, z: -2 }, // Point below the plane
            { id: 7, x: 2, y: 3, z: 5 }, // Point above the plane
        ]);

        // Define the edges to form the quad (connecting the plane corners)
        const edges = new DataSet([
            { id: 1, from: 1, to: 2 },
            { id: 2, from: 2, to: 3 },
            { id: 3, from: 3, to: 4 },
            { id: 4, from: 4, to: 1 }, // Closing the quad loop
        ]);

        console.log(edges)

        // Get the container reference
        const container = graphContainer.current;

        const data = {
            nodes: nodes,
            edges: edges,
        };

        const options = {
            physics: {
                enabled: false, // Disable physics for smoother performance on low-end devices
            },
            interaction: {
                hover: false, // Enable hover effect
                zoomView: false, // Enable zoom
                dragView: false, // Enable dragging the view
            },
            layout: {
                randomSeed: 2, // Make layout deterministic, avoid unnecessary re-layout
            },
            nodes: {
                shape: 'dot', // Simple dot shape for nodes to optimize rendering
                size: 10, // Adjust size for better performance
            },
            edges: {
                smooth: false, // Disable smoothing to keep performance high
                width: 2, // Control edge width for performance
                color: '#000', // Set axis line color to black
            },
            width: '100%',
            height: '500px'
        };

        // Create the network (3D graph)
        new Network(container, data, options);

        console.log('Graph rendered');

    }, [points, size]);

    return <div ref={graphContainer} style={{ width: '100%', height: '500px' }} />;
};

export default Graph;