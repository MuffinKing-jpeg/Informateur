import { hostname, networkInterfaces } from 'os';
import { NetworkInterface } from './interfaces/NetworkInterface.interface';

export class NetworkScan {
  /**
   * interfaces
   *
   * Stores list of network interfaces.
   */
  public interfaces: NetworkInterface[] = [];

  /**
   * hostname
   *
   * Stores hostname of device.
   */
  public hostname = hostname();

  private getLocalIPv4() {
    const nets = networkInterfaces();

    for (const interfaceName of Object.keys(nets)) {
      for (const net of nets[interfaceName] ?? []) {
        if (net.family === 'IPv4' && !net.internal) {
          this.interfaces.push({
            name: interfaceName,
            address: net.address,
            mac: net.mac,
          });
        }
      }
    }
  }
  constructor() {
    this.getLocalIPv4();
  }
}
