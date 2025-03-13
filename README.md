# dnsrecon

A command-line DNS reconnaissance tool that queries multiple record types using various public DNS servers.

## Features

- Concurrent querying of multiple DNS record types (A, MX, TXT, NS)
- Uses multiple public DNS servers for reliable results:
  - Google Public DNS (8.8.8.8, 8.8.4.4)
  - Cloudflare DNS (1.1.1.1, 1.0.0.1)
  - Quad9 DNS (9.9.9.9, 149.112.112.112)
  - OpenDNS (208.67.222.222, 208.67.220.220)
- Progress indication during queries
- Structured JSON output
- Graceful error handling

## Usage

```bash
npx 70-10/dnsrecon <domain>
```

### Example

```bash
$ npx 70-10/dnsrecon example.com
{
  "domain": "example.com",
  "aRecords": [
    "93.184.216.34"
  ],
  "mxRecords": [
    {
      "exchange": "mail.example.com",
      "priority": 10
    }
  ],
  "txtRecords": [
    ["v=spf1 -all"]
  ],
  "nsRecords": [
    "ns1.example.com",
    "ns2.example.com"
  ]
}
```

## Record Types

- **A Records**: IPv4 addresses
- **MX Records**: Mail server records with priority
- **TXT Records**: Text records (SPF, DKIM, verification codes, etc.)
- **NS Records**: Nameserver records

## Error Handling

- Individual query failures return null in the result
- Fatal errors exit with code 1 and error message
- Network errors are properly handled and reported

## Requirements

- Node.js
- Network connectivity
- DNS port accessibility

## License

MIT

## Contributing

Issues and pull requests are welcome.
