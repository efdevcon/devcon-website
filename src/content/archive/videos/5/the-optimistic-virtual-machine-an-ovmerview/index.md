---
edition: 5
title: "The Optimistic Virtual Machine: an Ov(m)erview"
description: "The Optimistic Virtual Machine (OVM) is a language for expressing layer 2 scaling solutions like state channels and plasma as a local fork choice. The language is built on a formal model of logical game semantics, along with a \"cryptoeconomic dispute assumption.\" Composing these primitives allows us to describe complex properties of layer 2 state. These layer 2 systems can be written as OVM \"programs\" which are compiled into both a client-side \"proof checker\" (the local OVM) and ethereum-side code. The Ethereum code acts as OVM \"interpreter\" contract on the Ethereum blockchain, which can interpret disputes for any and all of these layer 2 system (state channels, plasmas, etc.). We will go over the details of both the game semantics and Ethereum smart contracts in this workshop."
youtubeUrl: "https://youtu.be/KZmLmt9f_uk"
ipfsHash: "QmSJMCFR5QXP2ddKaz3kvtRjHgJRAh24RZjPoGBeCPWjvL"
duration: 1418
expertise: "Intermediate"
type: "Talk"
track: "Execution layer"
keywords: ['OVM','optimism','academic']
tags: ['Execution layer']
speakers: ['Karl Floersch','Ben Jones']
---