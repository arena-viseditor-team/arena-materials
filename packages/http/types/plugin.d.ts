import { Http as _Http } from "./http";

export type PluginFunction<T> = (Http: typeof _Http, options?: T) => void;

export interface PluginObject<T> {
  install: PluginFunction<T>;
  [key: string]: any;
}
