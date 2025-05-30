export interface IEvent {
    year: number;
    text: string;
}
  
export interface ITimeSegment {
    from: number;
    to: number;
    events: IEvent[];
    type: string;
}
  