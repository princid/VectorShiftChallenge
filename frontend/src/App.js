import { PipelineToolbar } from './toolbar';
import { PipelineUI } from './ui';
import { SubmitButton } from './submit';

function App() {
  return (
    <div className="app-layout">
      <div className="app-header">
        <PipelineToolbar />
        <SubmitButton />
      </div>
      <div className="app-workspace">
        <PipelineUI />
      </div>
    </div>
  );
}

export default App;
