---
edition: 4
title: "S-gram: Statistical Linter For Incomplete Solidity Smart Contracts"
description: "This presentation will introduce a statistical linting technique called S-gram for Solidity smart contracts. Generally, S-gram aims at finding bugs, stylistic errors, bad programming practice patterns in Solidity contracts. Unlike traditional approaches relying on program analysis which requires full/compilable contracts, S-gram offers automatic checking capability even for incomplete Solidity contracts, thus can help create better development experience where developers can almost code and check simultaneously. The key insight behind S-gram is that "unusual code is more likely to be buggy". The likelihood is measured via probability computation in statistical language models, e.g. N-gram. Specifically, S-gram builds an N-gram model out of a corpus of “good” contracts (“good” means meeting stylistic specifications and having no bugs). Given an incomplete contract c, S-gram first parses it into a token sequence based on abstract syntax tree types e.g., AssignExpr, CallExpr etc. Then, S-gram calculates probabilities with respect to the N-gram model for all the subsequences of c and further flags less-probable code as suspicious. This presentation will also introduce preliminary evaluation on S-gram in terms of capturing real-world smart contract errors. In the end, this presentation will highlight the future tooling support to integrate S-gram with a Solidity IDE."
youtubeUrl: "https://youtu.be/tCZGgDSAMAs"
ipfsHash: "https://ipfs.ethdevops.io/ipfs/QmXr16iMqccQuSioj81jRT3fwyR4zndaBbXdeCCtWEcbsy?filename=S-gram_-_Statistical_Linter_For_Incomplete_Solidity_Smart_Contracts_by_Han_Liu_Devcon4-tCZGgDSAMAs.mp4"
duration: 415
expertise: "Expert"
type: "Talk"
track: "Developer Experience"
keywords: ['linting',' QA',' testing']
tags: ['Developer Experience']
speakers: ['Han Liu']
---
