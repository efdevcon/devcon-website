---
edition: 5
title: "Ethereum 9¾: MimbleWimble for ERC20 with ZK Snark"
description: "Ethereum 9¾ is an entrance to the magical world to send ERC20s privately. It hides the transaction histories using MimbleWimble and ZK Snark.
A user enters into the magical world by depositing ERC20 tokens with a valid MimbleWimble output. As Ethereum 9¾ appends it as a coin-base to the Merkle Mountain Range tree, the user becomes able to use MimbleWimble spell to send ERC20 privately.
The contract only accepts MW spells which include an unlinkable spent tag, result outputs, and a ZK proof. The proof should pass the ZK-circuit which ensures that the tag is derived from an output which definitely exists in the MMR tree while the sum of spent and resulting outputs satisfies the MimbleWimble equation. Then, the spent tag prevents double-spending and ZK Snark secures deposited ERC20s by proving that the sum of inflow and outflow is zero by MimbleWimble protocol without revealing details.
Or the user can go back to the muggle world anonymously and withdraw ERC20s by providing an unlinkable spent tag and a ZK proof. Because MimbleWimble doesn't reveal the value during transactions and we also don't know which output has been spent, it becomes hard to link the deposit and withdrawal."
youtubeUrl: "https://www.youtube.com/embed/5LRh9iDb1sw"
ipfsHash: "QmRPAZ6kpnRMRoNsovU1my53GhSSTE2FQM39E4DkwdQajc"
ethernaIndex: "https://etherna.io/embed/6344e9a3080a54f6d733eabb"
ethernaPermalink: "https://etherna.io/embed/f1660512f61de715363ef66bfd567eb50d84e9e122c46ee5c76aec845630d8f1"
duration: 1130
expertise: "intermediate"
type: "Breakout"
track: "Privacy"
keywords: ['technical']
tags: ['Privacy']
speakers: ['Wanseob Lim']
---
