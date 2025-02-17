import { UncontrolledExample } from './components/uncontrolled-example';
import { ControlledExample } from './components/controlled-example';

export function App() {
  return (
    <div className="h-screen bg-muted">
      <div className="max-w-5xl mx-auto px-8 py-16 h-full space-y-16">
        <h1 className="text-2xl font-bold">Pulumi Takehome</h1>
        <UncontrolledExample />
        <ControlledExample />
      </div>
    </div>
  );
}
