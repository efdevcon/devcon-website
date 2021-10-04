---
edition: 5
title: "Catching exceptions in Solidity"
description: "When a revert happens in solidity, all the state changes done in that transaction are rolled back. All the changes done in sub calls are also rolled back. If a contract A tries to do a token transfer in contract B but contract B reverts, all the changes done by contract A will also be rolled back. This is fine for some cases but sometimes there might be a need to ignore or handle this revert in the smart contract itself.
The talk will demonstrate how reverts and other exceptions can be caught in Solidity."
youtubeUrl: "https://www.youtube.com/embed/z7NruBa2yFc"
ipfsHash: "QmVGHQEefFH2fSseHHap6ayckceBWunECzGfqieGCfiiGA"
duration: 208
expertise: "Intermediate"
type: "Talk"
track: "Developer Infrastructure"
keywords: ['technical']
tags: ['Developer Infrastructure']
speakers: ['Mudit Gupta']
---
