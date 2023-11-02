import { IndexString } from '../interfaces/Index.interface';

export class DBschema implements IndexString {
  admins: number[] = [];
  candidates: number[] = [];
  config: {} = {};
  [key: string]: any;
}
