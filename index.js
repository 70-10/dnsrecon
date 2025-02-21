#!/usr/bin/env node

import { defineCommand, runMain } from "citty";
import yoctoSpinner from "yocto-spinner";
import {
  resolve4,
  resolveMx,
  resolveNs,
  resolveTxt,
  setServers,
} from "node:dns/promises";

setServers([
  "8.8.8.8", // Google Public DNS
  "8.8.4.4", // Google Public DNS
  "1.1.1.1", // Cloudflare DNS
  "1.0.0.1", // Cloudflare DNS
  "9.9.9.9", // Quad9 DNS
  "149.112.112.112", // Quad9 DNS
  "208.67.222.222", // OpenDNS
  "208.67.220.220", // OpenDNS
]);

async function queryDNS(domain) {
  try {
    const [aRecords, mxRecords, txtRecords, nsRecords] = await Promise.all([
      resolve4(domain),
      resolveMx(domain),
      resolveTxt(domain),
      resolveNs(domain),
    ]);

    return {
      domain,
      aRecords,
      mxRecords,
      txtRecords,
      nsRecords,
    };
  } catch (error) {
    console.error(error);
    return null;
  }
}

const main = defineCommand({
  meta: {
    name: "dnsrecon",
    description: "DNS Reconnaissance tool",
    version: "0.1.0",
  },
  args: {
    domain: {
      type: "positional",
      description: "Domain to scan",
      required: true,
    }
  },
  async run({ args }) {
    const { domain } = args;
    const spinner = yoctoSpinner({ text: `Check domain: ${domain}` });
    spinner.start();

    try {
      const result = await queryDNS(domain);
      spinner.stop();

      console.log(JSON.stringify(result, null, 2));
    } catch (err) {
      spinner.stop();
      console.error(err.message);
      process.exit(1);
    }
  },
});

runMain(main);
