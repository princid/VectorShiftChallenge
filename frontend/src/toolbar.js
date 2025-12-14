// toolbar.js

import { DraggableNode } from './draggableNode';

export const PipelineToolbar = () => {

    return (
        <div className="app-toolbar">
            <DraggableNode type='customInput' label='Input' />
            <DraggableNode type='llm' label='LLM' />
            <DraggableNode type='customOutput' label='Output' />
            <DraggableNode type='text' label='Text' />
            <DraggableNode type='join' label='Join' />
            <DraggableNode type='filter' label='Filter' />
            <DraggableNode type='http' label='HTTP' />
            <DraggableNode type='transform' label='Transform' />
            <DraggableNode type='switch' label='Switch' />
        </div>
    );
};
