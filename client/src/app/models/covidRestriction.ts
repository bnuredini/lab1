export interface CovidRestriction {
    id: string;
    type: string;
    from: Date | null;
    until:  Date | null;
  }