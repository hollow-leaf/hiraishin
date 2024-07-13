import asyncio
import logging

from findmy.scanner import OfflineFindingScanner

logging.basicConfig(level=logging.INFO)

async def scanonce():
    scanner = await OfflineFindingScanner.create()
    json_data = {}
    async for device in scanner.scan_for(5, extend_timeout=True):
        json_data[device.mac_address] = {
            "public_key": device.adv_key_b64,
            "lookup_key": device.hashed_adv_key_b64,
            "status": device.status,
            "hint": device.hint,
            "additional_data": device.additional_data,
        }
    return json_data

async def scan() -> None:
    scanner = await OfflineFindingScanner.create()

    print("Scanning for FindMy-devices...\n")

    async for device in scanner.scan_for(10, extend_timeout=True):
        print(f"Device - {device.mac_address}")
        print(f"  Public key:   {device.adv_key_b64}")
        print(f"  Lookup key:   {device.hashed_adv_key_b64}")
        print(f"  Status byte:  {device.status:x}")
        print(f"  Hint byte:    {device.hint:x}")
        print("  Extra data:")
        for k, v in sorted(device.additional_data.items()):
            print(f"    {k:20}: {v}")
        print()


if __name__ == "__main__":
    asyncio.run(scan())
