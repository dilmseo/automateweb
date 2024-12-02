export interface AutomationStep {
  type: 'click' | 'input' | 'scroll' | 'wait';
  selector?: string;
  value?: string;
  timestamp: number;
}

export interface AutomationSequence {
  id: string;
  name: string;
  steps: AutomationStep[];
  createdAt: number;
}