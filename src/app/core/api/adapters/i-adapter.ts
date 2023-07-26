/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IAdapter<T, R = T> {
  adaptToModel(resp: any): T;  // recieve from backend
  adaptFromModel(data: Partial<R>): any; // send to backend
}
