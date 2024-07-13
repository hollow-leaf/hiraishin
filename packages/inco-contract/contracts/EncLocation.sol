// SPDX-License-Identifier: BSD-3-Clause-Clear

pragma solidity ^0.8.20;

import "fhevm/lib/TFHE.sol";

contract EncLocation {
    // lat and lon are encrypted 
    struct Location {
        euint32 lat;
        euint32 lon;
    }

    mapping(string => Location) public locations;

    function setLocation(string memory name, bytes calldata elat, bytes calldata elon) public {
        locations[name] = Location(TFHE.asEuint32(elat), TFHE.asEuint32(elon));
    }

    function getLocation(string memory name, bytes32 publicKey) public view returns (bytes memory, bytes memory) {
        Location memory location = locations[name];
        return (TFHE.reencrypt(location.lat, publicKey, 0), TFHE.reencrypt(location.lon, publicKey, 0));
    }
}