export interface IgRPCCall<T> {
  domain: string,
  _events: any,
  _eventsCount: number,
  _maxListeners: undefined | number,
  call: any,
  cancelled: boolean,
  metadata: any,
  request: T
}
