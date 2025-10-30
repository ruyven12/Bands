// ------- CONFIG -------
const SMUG = {
  NICKNAME: "vmpix",
  BASE_FOLDER: "Music/Archives/Bands",
}

// add logo URLs here when you have them
const LOGOS_MANUAL = {
  // "13 High": "https://vmpix.smugmug.com/Music/Band-Logos/i-XcmVMQF/0/M/i-XcmVMQF-M.jpg",
  "13 High":
    "https://photos.smugmug.com/photos/i-FRgjKKD/0/KhBshxQbV4Gk3PWZDRRW2NBLCz88LMT4nPW7zKJsw/S/i-FRgjKKD-S.png",
  "3FD":
    "https://photos.smugmug.com/Music/Band-Logos/i-XcmVMQF/0/KVkbqX7GW9dhpdLSSz8vxR99fNtxXTWkXhdJXTZDJ/X2/3FD-X2.jpg",
  "6-Gig":
    "https://photos.smugmug.com/photos/i-FRgjKKD/0/KhBshxQbV4Gk3PWZDRRW2NBLCz88LMT4nPW7zKJsw/S/i-FRgjKKD-S.png",
  "A River of Trees":
    "https://photos.smugmug.com/Music/Band-Logos/i-HbvKFrV/0/MQRGgZNRm3nKkx4xCNv7s5KqXxwPMTj6thZdTgHZZ/X2/A%20River%20of%20Trees-X2.jpg",
  "Absence of the Sun":
    "https://photos.smugmug.com/Music/Band-Logos/i-j39NTr3/0/MV7cxTwRtrTBbjTsJ4XvfWsWL3kwqVNRLCjsjdrvL/S/Absence%20of%20the%20Sun-S.jpg",
  Acoustified:
    "https://photos.smugmug.com/Music/Band-Logos/i-PQJkT2p/0/K4wJX3zVsRWMpgFkMPqBcHntt3ctDwzm66QqX5Rbc/L/Acoustified-L.jpg",
  Adema:
    "https://photos.smugmug.com/Music/Band-Logos/i-wGhMBXr/0/LGFpwCw8w8tBHCrtw6LHFDnV8xqnSSjhtW4SpWgBR/XL/Adema-XL.jpg",
  Aerosmith:
    "https://photos.smugmug.com/Music/Band-Logos/i-5mfGqgd/0/NJLdr6MzC6mwBtMSNmJLv7t8SVZsD37nWF3Q3fd7G/X2/Aerosmith-X2.jpg",
  Afterblack:
    "https://photos.smugmug.com/Music/Band-Logos/i-5PtmNNj/0/LcQjGLX7tXDgNLDWvSBVNLPDRxwphpkVgkvncNQhK/X2/Afterblack-X2.jpg",
  Alions:
    "https://photos.smugmug.com/photos/i-fHWLWgV/0/L55C44pDMtzTkkdgsqntGkNz6WdXPcfntxSNpLpFP/S/i-fHWLWgV-S.jpg",
  "All That Remains":
    "https://photos.smugmug.com/Music/Band-Logos/i-wS6N278/0/McqrGqb9GPknrwJQBjjSDsMqnmM2DLpCTXvtFzBsV/X2/All%20That%20Remains-X2.jpg",
  "Alter the Tides":
    "https://photos.smugmug.com/photos/i-zDvGGj2/0/Kdw7D9CBqP86dX8TPTw6JzfMsTTptPCgvSn6zwFvp/S/i-zDvGGj2-S.png",
  Amanita:
    "https://photos.smugmug.com/photos/i-3dL8kfD/0/LPDQgzSHrGKZdQCJ5ShrWcgTrwkfZCqk8vWz2Pgmq/M/i-3dL8kfD-M.jpg",
  "Amon Amarth":
    "https://photos.smugmug.com/Music/Band-Logos/i-Ptj76sD/0/NZnfLPM5f2fjTMw2h5XMBJGQDJF8KLbcJK7r7jZsK/X2/Amon%20Amarth-X2.jpg",
  "Among Shadows":
    "https://photos.smugmug.com/photos/i-fWBP2sT/0/LF28tqDzLhNZgZ4T8djJr5QfLMHnTCfNgZ4xQkF7d/M/i-fWBP2sT-M.png",
  "Anatomy of a Thief":
    "https://photos.smugmug.com/photos/i-4kdTtbF/0/NhVsB8B2Q7vFLz2StNrdRBsv6KtDB8RRVsBpp7QtW/M/i-4kdTtbF-M.jpg",
  "Arta'Sin":
    "https://photos.smugmug.com/photos/i-9xxWH27/0/NNnQJg6LjjmvQ22nM5scBZTMX69Bd5xMvh3MLPrmx/M/i-9xxWH27-M.jpg",
  "Ascent to Power":
    "https://photos.smugmug.com/photos/i-hBxRmNx/0/NX8nPCFMf8LkzGxCds9pMFtJ29w8BjXwRnhpd4J8P/M/i-hBxRmNx-M.jpg",
  "Ashen Grey":
    "https://photos.smugmug.com/photos/i-mKTmsVz/0/LM98RHH956dBvGzQB4R3rkn8NfsSCRmStPbmBrh2m/M/i-mKTmsVz-M.jpg",
  Avatar:
    "https://photos.smugmug.com/Music/Band-Logos/i-22wDFvS/0/NHcXjMPq4JxV3BN3cCrwXft37HzJnmwp2kZx6DZv4/X2/Avatar-X2.jpg",
  "The Band Apollo":
    "https://photos.smugmug.com/Music/Band-Logos/i-LpTjbhd/0/L4mGjhgWzHLbrvFZtZqV7GPCxckxgFbfmT5KqfNFQ/X2/Band%20Apollo%2C%20The-X2.jpg",
  Bastardane:
    "https://photos.smugmug.com/Music/Band-Logos/i-mvfFc5v/0/Kz7WbMvsQw4V9ttjB2jKMFnS5BKDcGz595KjtbqLR/X2/Bastardane-X2.jpg",
  Beartooth:
    "https://photos.smugmug.com/Music/Band-Logos/i-C76rV5x/0/LzRbDzGCwWJ7zX7xW7qFRCC9LRN9fRDcVGqRsgMrB/X2/Beartooth-X2.jpg",
  "Before the Betrayal":
    "https://photos.smugmug.com/Music/Band-Logos/i-dz9CmWC/0/M4b9tFqwPxC9gZw57xqbFbWp5SDhfCSvf6dxrqq3w/S/Before%20the%20Betrayal-S.jpg",
  "Black Box":
    "https://photos.smugmug.com/Music/Band-Logos/i-H2S4sbn/1/MTTk7wQCxW8dSX7J5Cq23rBCF96dJr2RQCwjxLSKT/X2/Black%20Box-X2.png",
  "Black Orange":
    "https://photos.smugmug.com/Music/Band-Logos/i-cNnJ8wz/0/NXFmZQh9jL7rpTbKwVMNbNKfd3NRq7K8qDmpNrfQq/X2/Black%20Orange-X2.jpg",
  "Black Stone Cherry":
    "https://photos.smugmug.com/Music/Band-Logos/i-wwGvb8p/0/K7gVHSvg3s3QpQSZzqCQbQ6CVdMqC2zz56cqXWW8q/X2/Black%20Stone%20Cherry-X2.jpg",
  "Black Vinegar":
    "https://photos.smugmug.com/Music/Band-Logos/i-jDghVqX/0/LRXQVGCrV9N5gdFtN7dDJZP2kVnmGwzP9GTSc3khf/L/Black%20Vinegar-L.jpg",
  Blackguard:
    "https://photos.smugmug.com/Music/Band-Logos/i-SqSBTfc/0/LK5Lg3Srh68gW8vpVBKZcCsjjFK9TrQkds9JTs57j/X2/Blackguard-X2.jpg",
  "Blind Alibi":
    "https://photos.smugmug.com/Music/Band-Logos/i-9Jg3Q3G/0/MRZXmZZ6WjGjfdPjHXDzJf8PqdqsFXXjVNGPsnkfD/XL/Blind%20Alibi-XL.jpg",
  "Bonded By Blood":
    "https://photos.smugmug.com/Music/Band-Logos/i-JPqhpm4/0/L5VM9FChxP9NT9RCzwTPctgBJhcdCV4k2wDb3nncF/X2/Bonded%20by%20Blood-X2.jpg",
  "Brand New Day":
    "https://photos.smugmug.com/Music/Band-Logos/i-L4m7swh/0/KZRJX3fsmfSkndnTHvVcZJLVf5hVnND49VVMhL92m/M/Brand%20New%20Day-M.jpg",
  "Broken Empire":
    "https://photos.smugmug.com/Music/Band-Logos/i-C8FkPgF/0/MBXk2dqwsbNPWqL8g6vWLhxvpvMRGxjKWKMVvQ7L9/L/Broken%20Empire-L.jpg",
  Buckcherry:
    "https://photos.smugmug.com/Music/Band-Logos/i-2ckpBd4/0/MVkx9rVxtxnr3cWcCCbdr64JxwbDJNZNND9cgmrrx/X2/Buckcherry-X2.jpg",
  "The Burial Curse":
    "https://photos.smugmug.com/Music/Band-Logos/i-52sGwsR/0/NZDs5rzLTtnwG7GjGQHpSmWrqdg2FC9V6LQzvjjkz/L/The%20Burial%20Curse-L.jpg",
  "Burning Time":
    "https://photos.smugmug.com/Music/Band-Logos/i-WChJBx8/0/KvpTfhC7qvpSFPT5Jr6TqmRRbRP2vZT2BmLhkKP9B/X2/Burning%20Time-X2.jpg",
  Cabal:
    "https://photos.smugmug.com/Music/Band-Logos/i-SLwBmDm/0/LWv4LCZQnKVJncSWH4BV86w3d6p9N5jbkdfxgJVdV/L/Cabal-L.jpg",
  "Calibrating the Calamity":
    "https://photos.smugmug.com/Music/Band-Logos/i-WpKSz88/0/KXFfPc7C9LrC8zH2t4nTXjbgHWzZ822dC3C8V7xwV/X2/Calibrating%20the%20Calamity-X2.jpg",
  "Capture the Sun":
    "https://photos.smugmug.com/Music/Band-Logos/i-rc3TQWw/0/MPJx4P8XJctjVbFW2fP96vKrKbxMmbhtfLbHnHHZj/L/Capture%20the%20Sun-L.jpg",
  Cavemanifesto:
    "https://photos.smugmug.com/Music/Band-Logos/i-bw9Mrv4/0/NGxqzcXwhS8V4Rm6FM2fHRVvdDZTJvQrm7tkVD98j/X2/Cavemanifesto-X2.jpg",
  "Civil Disturbance":
    "https://photos.smugmug.com/Music/Band-Logos/i-86SdM8F/0/KbpHMWnmwg2Z9VsN6NdnCxqWKfZHJphX6DtVbVfdM/M/Civil%20Disturbance-M.jpg",
  Core: "https://photos.smugmug.com/Music/Band-Logos/i-3kZTKqD/0/MCkLTtWb52SMgt3sgzvDVdPtFxR2n2dbxB49B8W2J/X2/Core-X2.jpg",
  "Crown Lands":
    "https://photos.smugmug.com/Music/Band-Logos/i-8txFRFj/0/NcFMj7SLzSxpQhLpLx8cTqnKVCPcpcLR8LD4kfQL5/X2/Crown%20Lands-X2.jpg",
  "Culling the Herd":
    "https://photos.smugmug.com/Music/Band-Logos/i-FzLL5rj/0/KF43JppWJDGz32bHf8VwGNHHkS3dLcX5jkP887wKB/M/Culling%20the%20Herd-M.jpg",
  Cytokine:
    "https://photos.smugmug.com/Music/Band-Logos/i-D5wB3Zb/0/L8FKx6zDPHJgfb8VnWqDWddwJjCb2fJFhkQjcrKJW/X3/Cytokine-X3.jpg",
  "Dark Rain":
    "https://photos.smugmug.com/Music/Band-Logos/i-nXSFZ9Q/0/KPcfFvV3DqhQjD9fBgszbWXDpcDtZNBPTdSW8x72w/X2/Dark%20Rain-X2.jpg",
  "Dawn of End":
    "https://photos.smugmug.com/Music/Band-Logos/i-ct7p6s9/0/NjR9jFttkKNz4z8LmvDw3vLwH8LTbFdMrP48ZsLtM/X2/Dawn%20of%20End-X2.jpg",
  "Dead By Wednesday":
    "https://photos.smugmug.com/Music/Band-Logos/i-hgrf4D8/0/KcrNPHmjVvd6zrRv2cPFJTqmpwpqZxZdKkndXH4B4/X2/Dead%20By%20Wednesday-X2.jpg",
  "Dead In Your Eyes":
    "https://photos.smugmug.com/Music/Band-Logos/i-3tP8S4N/0/KPFbgqW6fcL7hCVpfKBV5MvhFSmSP92Fhd23NdHMm/XL/Dead%20In%20Your%20Eyes-XL.jpg",
  "Dead Season":
    "https://photos.smugmug.com/Music/Band-Logos/i-vf6WpJp/0/L4JwxKgx5mRpQCDNmFhRjtJCGR9wPKtsbqGWG57zG/L/Dead%20Season-L.jpg",
  "Deadly Desire":
    "https://photos.smugmug.com/Music/Band-Logos/i-4WcQ44S/0/LnppcQ5JjM97Ms2dMGHBJMFnMLCt8kKQCgGMjg6fS/X2/Deadly%20Desire-X2.jpg",
  "Death Rattle":
    "https://photos.smugmug.com/Music/Band-Logos/i-jGRZfj4/0/KgLQdmpGcj5XcvDPQJVvHBfLTT8kT54nMvKHXrG7H/X2/Death%20Rattle-X2.jpg",
  "Death's Hand":
    "https://photos.smugmug.com/Music/Band-Logos/i-t6GZWM2/0/M7bmwNn9VQBFkggmdcHscMQR8gkHFjQvL232rCNDj/X2/Death%27s%20Hand-X2.jpg",
  "Deep Purple":
    "https://photos.smugmug.com/Music/Band-Logos/i-8S344qv/0/NGHQVwXCLkwq34mznpM3xdG2D9XQzGsfjL7KPGM5d/Th/Deep%20Purple-Th.jpg",
  "Destination: Void":
    "https://photos.smugmug.com/Music/Band-Logos/i-srmMLVq/0/KZ9xbMQnjXvz67kRk4qpNhCvtCMCvRsfWQTndn9HZ/X2/Destination%20Void-X2.jpg",
  "Devil's Nite Out":
    "https://photos.smugmug.com/Music/Band-Logos/i-krk8KJv/0/MQNWRPbwxmKhvrJk4Prt2vzWghnB4m532vH3ZB9Hh/X2/Devil%27s%20Nite%20Out-X2.jpg",
  Diablooo:
    "https://photos.smugmug.com/Music/Band-Logos/i-kPVJSVD/0/NMgkfSMSfbVs9qR6hdMS5PTBZs9XmWRNJBFPZnHwD/X2/Diablooo-X2.jpg",
  "Diamond Edge":
    "https://photos.smugmug.com/Music/Band-Logos/i-JCFDRg4/0/M8CqcLnLTwQ8vtJnkKSz8ngJLrBJvkQTCFWwjGtqK/X2/Diamond%20Edge-X2.jpg",
  "Dirty Rotten Winter":
    "https://photos.smugmug.com/Music/Band-Logos/i-qVK4CBF/0/NZNnphQvv2cSCcQM2wr67Sp5XKMjZ7LVRVssX5kbs/X2/Dirty%20Rotten%20Winter-X2.jpg",
  "Divison North":
    "https://photos.smugmug.com/Music/Band-Logos/i-4P8tNvq/0/KkkFJ3jDTFDwXWHqfv8JWvPVV6ZxkmXc5KHjX86VD/X2/Divison%20North-X2.jpg",
  "Drown in Filth":
    "https://photos.smugmug.com/Music/Band-Logos/i-RNQVdkD/0/KnZkmbWjbghjr73wMZjDzr4Xx6bcHTj5hTzsdvQHm/XL/Drown%20in%20Filth-XL.jpg",
  "Drunk in Public":
    "https://photos.smugmug.com/Music/Band-Logos/i-HCL5B8J/0/KWpH5kCR8DPRcLK4fPMxtqcn6Cf9TVSrk5S4wr2nr/L/Drunk%20in%20Public-L.jpg",
  "Echo Ritual":
    "https://photos.smugmug.com/Music/Band-Logos/i-vGN2B5q/0/KFRCxvcZNkS2KFNJ4dNBSzBRRp9NDxpRSmf25sGGQ/X2/Echo%20Ritual-X2.jpg",
  "Empty Halls":
    "https://photos.smugmug.com/Music/Band-Logos/i-NC8bJkb/0/NKmbGNDHp46c5JzWpbmh6DZrRFjdh4DbkgwTtb3zK/XL/Empty%20Halls-XL.jpg",
  Endgame:
    "https://photos.smugmug.com/Music/Band-Logos/i-jvp6RGh/0/MdG5Q9vCQr9TCbcFS9NNSL33NHZ2NMcsCR8JNHqJG/XL/Endgame-XL.jpg",
  Estabrook:
    "https://photos.smugmug.com/Music/Band-Logos/i-8Bwnc5k/0/LN3R222CzM5Nwk5fHvWMvC3BCNdjZ9Vg828FKJtJF/XL/Estabrook-XL.jpg",
  "Ethereal Rot":
    "https://photos.smugmug.com/Music/Band-Logos/i-5DgQX2q/0/NccGp5RcKgQ5CCL3RDdg9sjVzFnBv4JFW5z2KkL6j/X2/Ethereal%20Rot-X2.jpg",
  Evanescence:
    "https://photos.smugmug.com/Music/Band-Logos/i-gfscrG2/0/KWkBmLrTzP4T8wNspPfc476WFS4qg8Pk5bFPGFkwq/L/Evanescence-L.jpg",
  Extreme:
    "https://photos.smugmug.com/Music/Band-Logos/i-bcndGGX/0/L8TWKq5j9LwSk4sDnM4KqqBzTCKzjh94QvWDHXQvc/X2/Extreme-X2.jpg",
  "The Fall of Babylon":
    "https://photos.smugmug.com/Music/Band-Logos/i-LZqSwsV/0/LFLNMkNB8KLxBqXh7nTnH6HkLtthgQmQXFB2hGXPL/XL/The%20Fall%20of%20Babylon-XL.jpg",
  "Fever 333":
    "https://photos.smugmug.com/Music/Band-Logos/i-2rX3T5g/0/NDTShL7x59WG7dDT39W7QFrVsJ2HM549NWgGqXcnc/X2/Fever%20333-X2.jpg",
  "Fifth Freedom":
    "https://photos.smugmug.com/Music/Band-Logos/i-FNtR4ZP/0/MBM3qm3prmtK76tdkKDpqk3rMmtJWx4M6Xw92PcDL/X2/Fifth%20Freedom-X2.jpg",
  "Forbidden Covenant":
    "https://photos.smugmug.com/Music/Band-Logos/i-vBchr2h/0/KfnmhWQbKDjwVtFtQPtLdc4kdFKpQKkFf8TWbXRVF/M/Forbidden%20Covenant-M.jpg",
  "Four Feet Out":
    "https://photos.smugmug.com/Music/Band-Logos/i-JDjvDFw/0/LKTxv9bg7bQKXKfGSrnMZgvRShstqs2NVzxNgFrkM/S/Four%20Feet%20Out-S.jpg",
  Fozzy:
    "https://photos.smugmug.com/Music/Band-Logos/i-rnjR4Rv/0/LZbWNJ763FxJhNttN5HJ8Dbkg54gpvnTb9hgdtZb5/X2/Fozzy-X2.jpg",
  "Friday Night Lites":
    "https://photos.smugmug.com/Music/Band-Logos/i-zJTK9HH/0/KfHnQ6M83mLRnKWCXZF6zNcrPJNcZc28dmj6HLQmL/XL/Friday%20Night%20Lites-XL.jpg",
  Funnel:
    "https://photos.smugmug.com/Music/Band-Logos/i-XmXstF2/0/LcXrBPC2KXBfZ7PGqMjxb2CRNHJbZ29LgMHLvCbcQ/M/Funnel-M.jpg",
  Godsmack:
    "https://photos.smugmug.com/Music/Band-Logos/i-j23dmnM/0/NCzKcrDkgpTdTLrW2SG3m44Z39tq2QBzhNpxwm8hN/XL/Godsmack-XL.jpg",
  "The Hailing Tides":
    "https://photos.smugmug.com/Music/Band-Logos/i-RBFwJ4f/0/K7FN4cRJQp4LSLRzKcJtRDnkGhCmX4NTDzp26W6Gc/XL/The%20Hailing%20Tides-XL.jpg",
  "Hed PE":
    "https://photos.smugmug.com/Music/Band-Logos/i-cWLQtvx/0/Ngs6ZkFSqs2ksgjLJSxVnRCkxW9hvVQ3bKjkqNwrj/XL/Hed%20PE-XL.jpg",
  "Hogan's Alley":
    "https://photos.smugmug.com/Music/Band-Logos/i-R5LZK2g/0/NTm8JdGnh9DdpSM94sCCTBVTV9hnLDKNtDG9qJN8t/M/Hogans%20Alley-M.jpg",
  "Holy Filth":
    "https://photos.smugmug.com/Music/Band-Logos/i-L52zWF8/0/KVhTB3PCppv7Jsq555pbGdfP7jj2mMTvHVpqDccbw/X2/Holy%20Filth-X2.jpg",
  "I, The Conqueror":
    "https://photos.smugmug.com/Music/Band-Logos/i-qtvK2PM/0/Mvv2DSPxxDDv7r7Gk4qwwh34wmd8TRgfgzfJv9m7K/L/I%2C%20The%20Conqueror-L.jpg",
  "Identity Crisis":
    "https://photos.smugmug.com/Music/Band-Logos/i-mhg8d33/0/LT8pfHFLb6m3SRkThGFTHkC887b6pLHMB2vrDMZ5z/X2/Identity%20Crisis-X2.jpg",
  "In Flames":
    "https://photos.smugmug.com/Music/Band-Logos/i-5PhWsWk/0/KqVxqCd2LNX8h8HmLShv2kVxrhbttwQvZ7jBT7Crw/S/In%20Flames-S.jpg",
  "In The Wind":
    "https://photos.smugmug.com/Music/Band-Logos/i-432fb3b/0/NN68tdPnmSXsWHR2kwnD2x59MVM39mwFWHfr6jR54/XL/In%20The%20Wind-XL.jpg",
  "Inhuman Nature":
    "https://photos.smugmug.com/Music/Band-Logos/i-sh4TPZT/0/NGKtCM9kh8BK62dsfdHCz2nqkhpnBzmZTRf4KvZjp/S/Inhuman%20Nature-S.jpg",
  Interloc:
    "https://photos.smugmug.com/Music/Band-Logos/i-WT4KQc6/0/K2Mc8KFXmRn43PL449XsFnqgDZWWfSxBjd2CtqDJB/M/Interloc-M.jpg",
  "Iron Dynamite":
    "https://photos.smugmug.com/Music/Band-Logos/i-kF7svFD/0/KFQfxB7t4gvbrxXDFvXrS8DbPNgVzHVsXR6SCSZrG/XL/Iron%20Dynamite-XL.jpg",
  "Iron Gate":
    "https://photos.smugmug.com/Music/Band-Logos/i-9FPGbcs/0/LGKTv2FGRBDzfRbt3mGfcWhT3jSkNtQQRWtwTt6nG/X2/Iron%20Gate-X2.jpg",
  "In The Kingdom of Nightmares":
    "https://photos.smugmug.com/Music/Band-Logos/i-kT2JQHm/0/LFgSxq8NqNf6S2kB9V3Wj93k4Z5kTFBnFQbcwhxG9/XL/ITKON-XL.jpg",
  "In The Key of Suffering":
    "https://photos.smugmug.com/Music/Band-Logos/i-GtcpTkx/0/NSLZR2DGhk2Lkjm8V3hhZSqV24r5ZnZ6wkfrnwkdc/L/ITKOS-L.jpg",
  "Joyous Wolf":
    "https://photos.smugmug.com/Music/Band-Logos/i-8TfzPcR/0/MqMzHHgPgw6NLPTwgJgh2sm5k5w3L85tD3f68PRXP/X2/Joyous%20Wolf-X2.jpg",
  "Killswitch Engage":
    "https://photos.smugmug.com/Music/Band-Logos/i-nXdk7FT/0/MMgQbQgg5JTNzKNLbFBkfr86FCRCnrp6NvzrrTf3P/X2/Killswitch%20Engage-X2.jpg",
  Kittie:
    "https://photos.smugmug.com/Music/Band-Logos/i-73Q54bJ/0/LgwNd8fLBsVJx5LCzcXrhjhCgHnzLhLmskmMftGW9/S/Kittie-S.jpg",
  Kolossos:
    "https://photos.smugmug.com/Music/Band-Logos/i-GzBhxgx/0/MvSCfQHqtkDQmwP3ctD7GGVLfJvzQQK8ptRmFcdtW/L/Kolossos-L.jpg",
  Kryptosporidium:
    "https://photos.smugmug.com/Music/Band-Logos/i-k7W6tnN/0/Kc9t296qzhVnpDT8z2325RsJ7mvjpnTjVPx8j7gdn/X2/Kryptosporidium-X2.jpg",
  "Lacuna Coil":
    "https://photos.smugmug.com/Music/Band-Logos/i-HmPPmwK/0/KsCcKB8XpNz2MTNmJN5mjfpQJDdnmhHRqb737L7HD/X2/Lacuna%20Coil-X2.jpg",
  "Lamb of God":
    "https://photos.smugmug.com/Music/Band-Logos/i-jk6wPbq/0/NhjfRB4FCzW5xDRMfLxwc6SMcwMdsVxbXkLhf9DSb/X2/Lamb%20of%20God-X2.jpg",
  "Last Ones Alive":
    "https://photos.smugmug.com/Music/Band-Logos/i-sZZpsLD/0/K8mqrVtjVgMF4JzqHbQkrxHsSCcFMbpXswbmTbnbf/XL/Last%20Ones%20Alive-XL.jpg",
  "Lethal Creed":
    "https://photos.smugmug.com/Music/Band-Logos/i-LwXgBvK/0/KpmRLKPFfKzq8ZQ6WXzW7M3g4V9bGF6prJ5WZD2NS/X2/Lethal%20Creed-X2.jpg",
  "Lights Out":
    "https://photos.smugmug.com/Music/Band-Logos/i-kB27QRZ/0/KTWGqGsvJgq7QPMmdHqrtvBT4FxrrNkdSLqQ6WkcT/Ti/Lights%20Out-Ti.jpg",
  Loki: 
    "https://photos.smugmug.com/Music/Band-Logos/i-CZV9D4d/0/M79Z6XtQZHtJNzJG2xTJF5KP3pQncd5dbCkvQwDQ7/L/Loki-L.jpg",
  "Lone Wolf James":
    "https://photos.smugmug.com/Music/Band-Logos/i-Xm3CT3S/0/KRHPhjVCJ35NtRKmdLFXKFGtNqZPB2LVH5mJ7TTtV/X2/Lone%20Wolf%20James-X2.jpg",
  Mammothor:
    "https://photos.smugmug.com/Music/Band-Logos/i-s4WfQDX/0/NhDtkS4fV4Qfg8W2BWhFpgtKx5NP9cz42HQqjghk6/X2/Mammothor-X2.jpg",
  Manifest:
    "https://photos.smugmug.com/Music/Band-Logos/i-3C7N8zk/0/Lnj4rGBpKJFGbSRq6w4xXDLBJpMCKNRDMwwxTTLj6/X2/Manifest-X2.jpg",
  Manuel:
    "https://photos.smugmug.com/Music/Band-Logos/i-24p53hq/0/MX8fMtbkFzk7MdL4Z95jbTmttKh8z23MmKLsWVLDR/L/Manuel-L.jpg",
  "Midnight Possession":
    "https://photos.smugmug.com/Music/Band-Logos/i-Wxzjz4W/0/KKcBpnkPJBK7PMhnqzm4gq8QbCf7bfL8pzc7Htn25/X2/Midnight%20Possession-X2.jpg",
  MindShiver:
    "https://photos.smugmug.com/Music/Band-Logos/i-3VXLRFk/0/M3bfN4PzRwZpnQw7jdkpP3Qm9qxwRdFTpX7rwk8m5/M/Mindshiver-M.jpg",
  Misgyded:
    "https://photos.smugmug.com/Music/Band-Logos/i-Fzb8Knw/0/LVTw6FGc85hJmWW9F43mJDrjsrVb2t256RbmBznKq/X2/Misgyded-X2.jpg",
  Mound:
    "https://photos.smugmug.com/Music/Band-Logos/i-GFzSJMJ/0/KPGhJdgqQvLs2PQtJ45Pm9wtSc9xDGjk2LsN5qD83/X2/Mound-X2.jpg",
  Murcielago:
    "https://photos.smugmug.com/Music/Band-Logos/i-dfQb9H7/0/MdgQzckpxvD2CnJCH9L5f47gckVd49PNjSGVSgH49/X2/Murcielago-X2.jpg",
  Mushroomhead:
    "https://photos.smugmug.com/Music/Band-Logos/i-mjzRcfh/0/Mqb7kdfs3pDz9wZFVPJ4JQmHtnxdtRxL6cbpjQnHS/X2/Mushroomhead-X2.jpg",
  Ouvre:
    "https://photos.smugmug.com/Music/Band-Logos/i-sJTQTDd/0/KDdBkQJwKLSkkPWDM78nnC6sdzbxKtWpsccDSzPZw/X2/Ouvre-X2.jpg",
  "Paradise is Cancelled":
    "https://photos.smugmug.com/Music/Band-Logos/i-gmKd5N7/0/MFxzChrNkSNZkzwt6wgmwKsjWMHDrQcBL8vksPLrc/M/Paradise%20is%20Cancelled-M.jpg",
  Ponder:
    "https://photos.smugmug.com/Music/Band-Logos/i-p3wc3Nq/0/KPsXdNdCLw4HdSmPRhw2twzNV64nS6xbr368DM6Q8/X2/Ponder-X2.jpg",
  "Powerman 5000":
    "https://photos.smugmug.com/Music/Band-Logos/i-rx2KLvL/0/Ld5rXnxMBTPzPwGkMdTpHQJMJcCHbxcgkPkHL6FBt/X2/Powerman%205000-X2.jpg",
  "Project 246":
    "https://photos.smugmug.com/Music/Band-Logos/i-RPvjR2m/0/K9zfxnJM86tS4rRpDRwcbtzRPZQnnTgBXRKtDSxQF/S/Project%20246-S.png",
  "Prospect Hill":
    "https://photos.smugmug.com/Music/Band-Logos/i-T5Cp48T/0/NPnQgvN5FvXrKXnJWbkPmPQhG3885nsGvBdhnFNHF/X2/Prospect%20Hill-X2.jpg",
  Pulsifier:
    "https://photos.smugmug.com/Music/Band-Logos/i-gm4NwCz/0/LVP8H3R7n4WPNBsQVJqDV4WcZkppzqnhN8m2rJm39/L/Pulsifier-L.jpg",
  "Pushing the Clock":
    "https://photos.smugmug.com/Music/Band-Logos/i-X3mWQnt/0/NXhMpS66JFrGrQFxW53kRJ2NDR3NMZmfhhHvD6x3t/XL/Pushing%20the%20Clock-XL.jpg",
  "The Resistance":
    "https://photos.smugmug.com/Music/Band-Logos/i-NQgX7wc/0/KvVXq8kqKqRtB8HsRM7WhCrqVxZ7FmkmxwKSGntxp/L/The%20Resistance-L.jpg",
  "Re:Vision":
    "https://photos.smugmug.com/Music/Band-Logos/i-PmXJVpp/0/NfZH9KWQJJf2hZfm29vmkqkvPDPFsQvB5WtmZgbZf/X2/Revision-X2.jpg",
  Ruin: 
    "https://photos.smugmug.com/Music/Band-Logos/i-hz8MQvT/0/KsSQhHRJjjgxk8ngDCxfsZVW26PbsQ2rNTvr3QQdJ/L/Ruin-L.jpg",
  "Saturn's Return":
    "https://photos.smugmug.com/Music/Band-Logos/i-W2kkJ3j/0/KgzN7g36jLqS7XTKNfFdGLPVrzkvJTcszFBh8LcBM/M/Saturns%20Return-M.jpg",
  "Scotty Saints":
    "https://photos.smugmug.com/Music/Band-Logos/i-mkxmpN5/0/LBZK4jtwcc6xdfV3F2D3CH23LgS6xzM8QWW9wDQMN/X2/Scotty%20Saints-X2.jpg",
  "Seasons of Ash":
    "https://photos.smugmug.com/Music/Band-Logos/i-h2WkXk8/0/K5Bv398XLKkL4fFPCXWLNdhFX3pgPtrkqg95Nk2Ln/X2/Seasons%20of%20Ash-X2.jpg",
  Seattle:
    "https://photos.smugmug.com/Music/Band-Logos/i-FFzf3Hd/0/LXN2MHB8TXpRSjMdKZm4tGz7BcSsWdHPGnwKW2Wmd/XL/Seattle-XL.jpg",
  "Second Sight":
    "https://photos.smugmug.com/Music/Band-Logos/i-kq9KvH2/0/Mw8Pv8SpNRmpcpwZqW296W4pC6p2HQjWv94CfXsDP/X2/Second%20Sight-X2.jpg",
  Seether:
    "https://photos.smugmug.com/Music/Band-Logos/i-wpSF6wt/0/L2d2gLDqpZHfQDmjWHs3CgkNZfG86gPwG7W3RrkR7/X2/Seether-X2.jpg",
  Slampig:
    "https://photos.smugmug.com/Music/Band-Logos/i-9S7T4Ng/0/NLNVWVWjtDLnjs7VzZ3MZdgjHcRdKzfZ8vf9ssvkF/S/Slampig-S.jpg",
  "Smothered Sun":
    "https://photos.smugmug.com/Music/Band-Logos/i-JMzWM5z/0/MPRRjkM7HZfX4zx6v3RwHb4QB4nTcKdDJ63r8Xz5s/X2/Smothered%20Sun-X2.jpg",
  SoiL: 
    "https://photos.smugmug.com/Music/Band-Logos/i-MNqB97L/0/NCvj7VVGk6xHtxqLVKhC4TV2pPRRCZxGSjCbkcG5m/X2/SoiL-X2.jpg",
  "Something Stupid":
    "https://photos.smugmug.com/Music/Band-Logos/i-jQFcK2V/0/LjRCFk2B869Zr69kRDzMSvFq6VHsZ99shVvns45LK/X2/Something%20Stupid-X2.png",
  "Sonic Libido":
    "https://photos.smugmug.com/Music/Band-Logos/i-dvQ94s3/0/Mcqb37x6GCZrxbW7MjMjPtRDQBQvpHRnP6F3VQnxm/L/Sonic%20Libido-L.jpg",
  Spectrobot:
    "https://photos.smugmug.com/Music/Band-Logos/i-gHTBPkh/0/KGJHpCszC3mk2FX7q9DgcWNrkGCv4vNfdLvg9Nmdr/S/Spectrobot-S.jpg",
  "Stand Abandoned":
    "https://photos.smugmug.com/Music/Band-Logos/i-cG2Tptq/0/MJXzPgbZkW3cmvtHs7MFZPV7N82x4SzJPm8tggc9v/X2/Stand%20Abandoned-X2.jpg",
  "Stillborn Condition":
    "https://photos.smugmug.com/Music/Band-Logos/i-Zw5hvB5/0/LxXGsTr5f8mncqN353hSwbcrRMjhC8WDQB7qqWC3Q/X2/Stillborn%20Condition-X2.jpg",
  "Sygnal to Noise":
    "https://photos.smugmug.com/Music/Band-Logos/i-ZhZBDdd/0/K2VfMXrtj5NR92L3DxJtmS4LGLZqMkNrcKVXCMZPV/L/STN-L.jpg",
  "Stove Up":
    "https://photos.smugmug.com/Music/Band-Logos/i-JJPmX5m/0/KHr4CVwQjj3SjVJxz5ZMLzsF53TDvCJpmXW2RTrkg/X2/Stove%20Up-X2.jpg",
  Sythe:
    "https://photos.smugmug.com/Music/Band-Logos/i-wpjm8q7/0/K8zsszSLfWS2PP8C7gQkBsf8FCX4XpNLZQZLVRW8d/X2/Sythe-X2.jpg",
  Tactiles:
    "https://photos.smugmug.com/Music/Band-Logos/i-FD95ChH/0/NBbLFPnHMfKZT3j5JTF877KpLqh6xw4tdZsgMNQ4M/X2/Tactiles-X2.jpg",
  "The Unscarred":
    "https://photos.smugmug.com/Music/Band-Logos/i-J6VtZpp/0/KmPM94SBKW5C6qPRMSxgTFPT4q7CRvzRfnND2Z7Pd/X2/The%20Unscarred-X2.jpg",
  "Thousand Mile Fall":
    "https://photos.smugmug.com/Music/Band-Logos/i-b3xCgss/0/MFPZHvTFRXNsQ72f9XFfrt8wRxxpVxKFGbFv7FKFb/X2/Thousand%20Mile%20Fall-X2.jpg",
  "Threat Signal":
    "https://photos.smugmug.com/Music/Band-Logos/i-fzcD6VN/0/MszMT27R8QrhgrDjpDq5JbZDfjxsDssXR4dQfPxFZ/S/Threat%20Signal-S.jpg",
  "Throttle":
    "https://photos.smugmug.com/Music/Band-Logos/i-jN5mTwZ/0/NMkTMRvB53PdpCdzKc2Jgx7N8kmFX2gzw7MKZdjNp/L/Throttle-L.jpg",
  "Thy Enemy":
    "https://photos.smugmug.com/Music/Band-Logos/i-rbSbTKW/0/MX3GtKqTZFgJfc4HQv3bhWHvHr7nWnjcH736RD7gb/XL/Thy%20Enemy-XL.jpg",
  "Time Out Timmy":
    "https://photos.smugmug.com/Music/Band-Logos/i-PWgst89/0/K9Lbkwv5kJXg8x7CvQChV8ccdcHVbv6Nwv8dqhDqt/X2/Time%20Out%20Timmy-X2.jpg",
  "Too Late The Hero":
    "https://photos.smugmug.com/Music/Band-Logos/i-pbjWfs5/0/NJXtFDxxRsH2VD7BmfQnwNX59nHhFwDxLTZwKzj24/M/Too%20Late%20The%20Hero-M.jpg",
  "Trash Fire":
    "https://photos.smugmug.com/Music/Band-Logos/i-4GVb82c/0/KMrTTmqDZk6H9S8fqjFhdc8WV6xhbdTTVFCrzGXq2/X2/Trash%20Fire-X2.jpg",
  "Trawl":
    "https://photos.smugmug.com/Music/Band-Logos/i-WrMGrgQ/0/LPpdpw3dcn6P9NzkfPc7QJDRmzS6qHDfhMksVxmqR/X2/Trawl-X2.jpg",
  "Tree":
    "https://photos.smugmug.com/Music/Band-Logos/i-Wdg5785/0/NbbjNhhjRvvWMDpp4Qr5f8B6kHzHMKC97G57Cp5D6/Th/Tree-Th.jpg",
  "Trans-Siberian Orchestra":
    "https://photos.smugmug.com/Music/Band-Logos/i-Kd5q4sx/0/L3wLFVBCPnSxj7QGvnL8BXg83ZSVV2MrjxHMRMPRk/X2/TSO-X2.jpg",
  "Twin Grizzly":
    "https://photos.smugmug.com/Music/Band-Logos/i-HDFK8n8/0/NV5PMbTWJZWSpZMpSjvWV7jL99g2XMmcP77w2TbbP/XL/Twin%20Grizzly-XL.jpg",
  "Two Forty Gordy":
    "https://photos.smugmug.com/Music/Band-Logos/i-z4Spmwr/0/LnhxKDGLVt2TDsdLgckgmT7P3BGfdsZcCZsrrHFLT/L/Two%20Forty%20Gordy-L.jpg",
  "Uncertainty":
    "https://photos.smugmug.com/Music/Band-Logos/i-4tVWRqC/0/Ktr6PfV9k3RwMktDVbC62cbtVjJSMZX9ms6jQBw2V/L/Uncertainty-L.jpg",
  "Uncle Jack":
    "https://photos.smugmug.com/Music/Band-Logos/i-ZnwhQb7/0/KTJ4zp2gFbPTn9VZ5fG8vSkChrVGhRJm6VNXJkRQ4/X2/Uncle%20Jack-X2.jpg",
  "Viqueen":
    "https://photos.smugmug.com/Music/Band-Logos/i-LXLNVZD/0/L4gTkGnkBt3wBn3VQpT8sTKJvSNvwVHnM43xG3wz6/X2/Viqueen-X2.jpg",
  "Voices of the Dead":
    "https://photos.smugmug.com/Music/Band-Logos/i-PsqNTmZ/0/LrmjW5phRh6tPqPJdJTncLZ7xZjNQfBxtntWVVbNn/L/Voices%20of%20the%20Dead-L.jpg",
  "Volbeat":
    "https://photos.smugmug.com/Music/Band-Logos/i-7JJtjXW/0/L8xbF5LmnVkqf77PgDJdQx55Z5hmRcGnZScV8h9xf/L/Volbeat-L.jpg",
  "VRSA":
    "https://photos.smugmug.com/Music/Band-Logos/i-QZm6s2C/0/K2mmLCk2jng6XpWsMsmjkNd6KFznMwfQT6zQLCgjW/X2/VRSA-X2.jpg",
  "War Criminal":
    "https://photos.smugmug.com/Music/Band-Logos/i-ZxmXCLz/0/NhjxHFbGHVMCDzXCSqdXGVJCjhZGtNHxGcqWpvrS2/M/War%20Criminal-M.jpg",
  "Wecreatedthismonster":
    "https://photos.smugmug.com/Music/Band-Logos/i-tzv5599/0/NQRTHzzPRnqdgx4bTFx3wqbdcd5VHcpT4JMM5ZPwB/M/Wecreatedthismonster-M.jpg",
  "Widow Sunday":
    "https://photos.smugmug.com/Music/Band-Logos/i-J9SXFH6/0/KTBKrj5DFdnDn3GsSbRKmVrj6z359tPjBjVgMS9jH/X2/Widow%20Sunday-X2.jpg",
  "When Muppetz Attack":
    "https://photos.smugmug.com/Music/Band-Logos/i-L6NzjNd/0/Kr4THVVVMNHGfxxzGq94tJmT8NzP7hVPhzg3rNcK2/M/WMA-M.jpg",
  "When The Dead Won't Die":
    "https://photos.smugmug.com/Music/Band-Logos/i-bZkkGv9/0/LVc3RNnmq6PTHMtjxc9k567Rtw5v5Lfk9gVMVW8hz/X2/WTDWD-X2.jpg",
}

const REGION_IMAGES = {
  Local:
    "https://photos.smugmug.com/photos/i-SCzbkmj/1/KjHvTQVKnSz36KmxFS5c2MrtLhgm9Wc8mTghFb5R8/M/i-SCzbkmj-M.png",
  Regional:
    "https://photos.smugmug.com/photos/i-x5ncQx7/0/KcWqCsJ2cD94cz6fn2hwGxJjdMrbV6kSCXQ3ssGGw/S/i-x5ncQx7-S.jpg",
  National:
    "https://photos.smugmug.com/photos/i-3Kk8S5k/0/MznDGX8kBgM99xp6RKNKf4L4VHtnKrx3ghQLF85h7/S/i-3Kk8S5k-S.jpg",
  International:
    "https://photos.smugmug.com/photos/i-jqJ9RJd/0/LhpXpWQjX2Gbbh9nn4DsjxvwMWZBDWSMpSFRfPxJq/S/i-jqJ9RJd-S.jpg",
}

// region → letter → bands
const BANDS = {
  Local: {
    "O-C": [
      { name: "13 High" },
      { name: "3FD" },
      { name: "6-Gig" },
      { name: "Absence of the Sun" },
      { name: "Acoustified" },
      { name: "Afterblack" },
      { name: "Alions" },
      { name: "Alter the Tides" },
      { name: "Amanita" },
      { name: "Among Shadows" },
      { name: "Anatomy of a Thief" },
      { name: "Angel Slayer" },
      { name: "Arta'Sin" },
      { name: "Ascent to Power" },
      { name: "Ashe Madness" },
      { name: "Ashen Grey" },
      { name: "Audio Apocalypse" },
      { name: "Badtude" },
      { name: "The Band Apollo" },
      { name: "Battery Steele" },
      { name: "Beautiful Pain" },
      { name: "Before the Betrayal" },
      { name: "Beyond the Fall" },
      { name: "Big Meat Hammer" },
      { name: "Black Box" },
      { name: "Black Orange" },
      { name: "Black Vinegar" },
      { name: "Blind Alibi" },
      { name: "Bloodborn" },
      { name: "Brand New Day" },
      { name: "Break The Skin" },
      { name: "BreakThrough" },
      { name: "Broken Empire" },
      { name: "The Burial Curse" },
      { name: "Burning Time" },
      { name: "Cabal" },
      { name: "Calibrating the Calamity" },
      { name: "Capture the Sun" },
      { name: "Cavemanifesto" },
      { name: "Cheers to Verona" },
      { name: "Civil Disturbance" },
      { name: "Clapping in Irons" },
      { name: "Conscious Cadaver" },
      { name: "Corn Borer" },
      { name: "Cover One Eye" },
      { name: "Cradle II Grave" },
      { name: "Creatures" },
      { name: "Cryptid Slaughter" },
      { name: "Culling the Herd" },
    ],
    "D-G": [
      { name: "Dark Rain" },
      { name: "Dark River Rising" },
      { name: "Dave Osborne Band" },
      { name: "Dead In Your Eyes" },
      { name: "Dead Season" },
      { name: "Deadly Desire" },
      { name: "Death's Hand" },
      { name: "Destination: Void" },
      { name: "Devil's Nite Out" },
      { name: "Diablooo" },
      { name: "Dirty Rotten Winter" },
      { name: "Division North" },
      { name: "Drown in Filth" },
      { name: "Drunk in Public" },
      { name: "Echo Ritual" },
      { name: "El Grande" },
      { name: "Eldemur Krimm" },
      { name: "EndGame" },
      { name: "enigmatheory" },
      { name: "Enlightened StrangeLink" },
      { name: "Estabrook Inc" },
      { name: "Ethereal Rot" },
      { name: "Everything In-Between (EIB)" },
      { name: "Exclave" },
      { name: "The Fall of Babylon" },
      { name: "False Prophecy" },
      { name: "Fates Last Fight" },
      { name: "Fifth Freedom" },
      { name: "Forbidden Covenant" },
      { name: "Forward Momentum Prophecy (FMP)" },
      { name: "Four Feet Out" },
      { name: "Friday Night Lites" },
      { name: "The Great North" },
    ],
    "H-K": [
      { name: "The Hailing Tides" },
      { name: "Hatred Alive" },
      { name: "Heart Shaped Rock" },
      { name: "Hogan's Alley" },
      { name: "The Hollow Glow" },
      { name: "Holy Filth" },
      { name: "I, The Conqueror" },
      { name: "Identity Crisis" },
      { name: "In The Key of Suffering" },
      { name: "In the Kingdom of Nightmares" },
      { name: "In The Wind" },
      { name: "Inhuman Nature" },
      { name: "Interloc" },
      { name: "Iron Dynamite" },
      { name: "J-Dubb & CPE" },
      { name: "Juboybe" },
      { name: "Kamikaze Angel" },
      { name: "Ken/James Grimmsley (Acoustic)" },
      { name: "Killing Voorhees" },
      { name: "Kolossos" },
      { name: "Kryptosporidium" },
    ],
    "L-O": [
      { name: "Last Ones Alive" },
      { name: "Lawton" },
      { name: "Leach Field" },
      { name: "Left on the Outside (LOTO)" },
      { name: "Lemonade" },
      { name: "Lethal Creed" },
      { name: "Loki" },
      { name: "Manuel" },
      { name: "The Marble Socket" },
      { name: "Marshall Marquis Band" },
      { name: "Mechanical Banshees" },
      { name: "Metal Night" },
      { name: "Midnight Possession" },
      { name: "Mill Fire" },
      { name: "MindShiver" },
      { name: "Misantrophy" },
      { name: "Misgyded" },
      { name: "Morganite" },
      { name: "The Motor Creeps" },
      { name: "MOUND" },
      { name: "Murcielago" },
      { name: "My Tempered Soul" },
      { name: "NOBIS" },
      { name: "Notyetlost" },
      { name: "NOVA" },
      { name: "Objet" },
      { name: "Omniterra" },
    ],
    "P-S": [
      { name: "Paradise is Cancelled" },
      { name: "Pariah" },
      { name: "Peter Mack (Acoustic)" },
      { name: "Ponder" },
      { name: "Project 246" },
      { name: "Project 1313" },
      { name: "Pulsifier" },
      { name: "Pushing the Clock" },
      { name: "Rapper Ashley" },
      { name: "RC.Budaka" },
      { name: "Rebirth to Ends" },
      { name: "Render" },
      { name: "The Resistance" },
      { name: "Re:Vision" },
      { name: "Ripfence" },
      { name: "A River of Trees" },
      { name: "Roseview" },
      { name: "Ruckus" },
      { name: "RUIN" },
      { name: "Ryze Above" },
      { name: "Salvo" },
      { name: "Saturn's Return" },
      { name: "S.C.O.B.Y." },
      { name: "Scotty Saints and the True Believers" },
      { name: "Seasons of Ash" },
      { name: "Seattle" },
      { name: "Second Sight" },
      { name: "The Secret of Esrever" },
      { name: "Seize the Vatican" },
      { name: "Shy Green" },
      { name: "Sidecar Radio" },
      { name: "Sinfist" },
      { name: "Skrye" },
      { name: "Slampig" },
      { name: "Smothered Sun" },
      { name: "Society, Inc" },
      { name: "Something Stupid" },
      { name: "Sonic Libido" },
      { name: "Sound and Vice" },
      { name: "Spawn of Man" },
      { name: "Spectrobot" },
      { name: "Spidermilk" },
      { name: "Stillborn Condition" },
      { name: "Stoned Audio" },
      { name: "Stove Up" },
      { name: "Strict9" },
      { name: "Strictly Business" },
      { name: "The Struggle Within" },
      { name: "Sygnal to Noise" },
      { name: "Sythe" },
    ],
    "T-Z": [
      { name: "Tattered Hearts Club" },
      { name: "Terrible Old Man" },
      { name: "Thousand Mile Fall" },
      { name: "Throttle" },
      { name: "Thy Enemy" },
      { name: "Too Late the Hero" },
      { name: "Towers" },
      { name: "Toxic Cross" },
      { name: "A Traitor's Pact" },
      { name: "Trash Fire" },
      { name: "Trawl" },
      { name: "Tried and True" },
      { name: "Twin Grizzly" },
      { name: "Two Forty Gordy" },
      { name: "Typhoid Mary" },
      { name: "Uncertainty" },
      { name: "Uncle Jack" },
      { name: "The Unscarred" },
      { name: "The Vanityites" },
      { name: "VennDetta" },
      { name: "Viqueen" },
      { name: "The Waking Life" },
      { name: "War Criminal" },
      { name: "Weaoons at Hand" },
      { name: "Wecreatedthismonster" },
      { name: "When Muppetz Attack" },
      { name: "When The Dead Won't Die" },
      { name: "Worthy Bones" },
      { name: "Y Wouldn't U" },
      { name: "Years Go By" },
      { name: "Zealous Bellus" },
    ],
  },
  Regional: {
    "O-G": [
      { name: "4x4 Barracuda" },
      { name: "Aegri Somnia" },
      { name: "The Beast of Nod" },
      { name: "Begat the Nephilim" },
      { name: "Bottlefight" },
      { name: "Carnivora" },
      { name: "Carolina Burn" },
      { name: "Cougar Bait" },
      { name: "Cryptius" },
      { name: "Cytokine" },
      { name: "Dawn of End" },
      { name: "Dead By Wednesday" },
      { name: "Death Rattle" },
      { name: "Death Ray Vision" },
      { name: "Deathcode" },
      { name: "Diamond Edge" },
      { name: "Diecast" },
      { name: "Empty Halls" },
      { name: "Exhale" },
    ],
    "H-M": [
      { name: "Hope Before the Fall" },
      { name: "I-Invent" },
      { name: "Ire & Woe" },
      { name: "Iron Gate" },
      { name: "Leaving Eden" },
      { name: "Lone Wolf James" },
      { name: "Mammothor" },
      { name: "Manifest" },
      { name: "Mindset-X" },
      { name: "Muckler's Circle" },
      { name: "My Missing Half" },
    ],
    "N-S": [
      { name: "No Room To Breathe" },
      { name: "Novus Dae" },
      { name: "Pistol Shot Gypsy" },
      { name: "Prospect Hill" },
      { name: "Puddles of Joy" },
      { name: "Reaver" },
      { name: "Renegade Cartel" },
      { name: "SEXcoffee" },
      { name: "SIXTEENx20" },
      { name: "Sonic Pulse" },
      { name: "Stand Abandoned" },
    ],
    "T-Z": [
      { name: "Tactiles" },
      { name: "Time Out Timmy" },
      { name: "TREE" },
      { name: "Voices of the Dead" },
      { name: "VRSA" },
      { name: "Widow Sunday" },
      { name: "Wreckless Child" },
    ],
  },
  National: {
    "O-G": [
      { name: "10 Years" },
      { name: "Adema" },
      { name: "Aerosmith" },
      { name: "All That Remains" },
      { name: "Almost Accounted For" },
      { name: "Alter Bridge" },
      { name: "Avenged Sevenfolkd" },
      { name: "AWOLNATION" },
      { name: "Bam Margera-Fuckface Unstoppable" },
      { name: "Bastardane" },
      { name: "Beartooth" },
      { name: "Black Stone Cherry" },
      { name: "Bonded by Blood" },
      { name: "Brett Young" },
      { name: "Buckcherry" },
      { name: "Burden of the Sky" },
      { name: "Butcher Babies" },
      { name: "Chevelle" },
      { name: "Cliver" },
      { name: "Clutch" },
      { name: "Core" },
      { name: "Corrosion of Conformity" },
      { name: "Dark Sky Choir" },
      { name: "Devil You Know" },
      { name: "Devour the Day" },
      { name: "Dillinger Escape Plan" },
      { name: "Disturbed" },
      { name: "Eric Church" },
      { name: "Eva Under Fire" },
      { name: "Evanescence" },
      { name: "Extreme" },
      { name: "Eye Empire" },
      { name: "Fever 333" },
      { name: "Filmore" },
      { name: "First Jason/Ari Lehman" },
      { name: "Fozzy" },
      { name: "Godsmack" },
      { name: "GFM" },
    ],
    "H-M": [
      { name: "Hatebreed" },
      { name: "Hed-PE" },
      { name: "Hell or Highwater" },
      { name: "Hellyeah" },
      { name: "I, Prevail" },
      { name: "Ill Nino" },
      { name: "Imagine Dragons" },
      { name: "In This Moment" },
      { name: "Incite" },
      { name: "Janus" },
      { name: "Josey Scott Band" },
      { name: "Joyous Wolf" },
      { name: "Killswitch Engage" },
      { name: "KrashKarma" },
      { name: "Kyng" },
      { name: "Lamb of God" },
      { name: "Lody Kong" },
      { name: "Losing September" },
      { name: "Maddie & Tae" },
      { name: "Mastodon" },
      { name: "Memphis May Fire" },
      { name: "Middle Class Rut" },
      { name: "Modern Day Outlaw" },
      { name: "Mushroomhead" },
    ],
    "N-S": [
      { name: "The Nocturnal Affair" },
      { name: "Nonpoint" },
      { name: "Octobrists" },
      { name: "Papa Roach" },
      { name: "Powerman 5000" },
      { name: "Rob Zombie" },
      { name: "Sevendust" },
      { name: "Shadowplay" },
      { name: "Slash/Myles Kennedy" },
      { name: "SoiL" },
      { name: "Soulfly" },
      { name: "Starset" },
      { name: "Stone Sour" },
      { name: "Sykosis" },
    ],
    "T-Z": [
      { name: "Taproot" },
      { name: "Texas Hippie Coalition" },
      { name: "Thrashole" },
      { name: "Threatpoint" },
      { name: "Through Fire" },
      { name: "Trans-Siberian Orchestra" },
      { name: "Tremonti" },
      { name: "Trivium" },
      { name: "Ultra Major" },
      { name: "Unlocking the Truth" },
      { name: "Unsaid Fate" },
      { name: "VentanA" },
      { name: "Wayland" },
      { name: "We Came As Romans" },
      { name: "Wikkid Witch" },
    ],
  },
  International: {
    All: [
      { name: "The Agonist" },
      { name: "Amon Amarth" },
      { name: "Avatar" },
      { name: "Blackguard" },
      { name: "Crown Lands" },
      { name: "Deep Purple" },
      { name: "In Flames" },
      { name: "Kittie" },
      { name: "Lacuna Coil" },
      { name: "Seether" },
      { name: "Threat Signal" },
      { name: "Volbeat" },
    ],
  },
}


// ------- /CONFIG -------

const treeEl = document.getElementById("tree")
const resultsEl = document.getElementById("results")
const crumbsEl = document.getElementById("crumbs")
const statusEl = document.getElementById("status")
const filterInput = document.getElementById("filterInput")

const toSlug = (s) =>
  (s || "")
    .trim()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9\s-]+/gi, "")
    .replace(/\s+/g, "-")
    .toLowerCase()
	


function resolveLogoUrl(bandName) {
  const slug = toSlug(bandName)
  return LOGOS_MANUAL[bandName] || LOGOS_MANUAL[slug] || ""
}

function showBandCard(region, letter, bandObj) {
  const bandDisplay = bandObj.name
  const bandFolder = bandObj.folder || toSlug(bandDisplay)
  const bandUrl = `https://${SMUG.NICKNAME}.smugmug.com/${SMUG.BASE_FOLDER}/${region}/${bandFolder}`

  // clear header + right area
  crumbsEl.textContent = ""
  resultsEl.innerHTML = ""

  // main wrapper
  const wrapper = document.createElement("div")
  wrapper.className = "band-detail"

  // band name
  const title = document.createElement("h2")
  title.textContent = bandDisplay
  wrapper.appendChild(title)

  // simple panel
  const panel = document.createElement("div")
  panel.className = "band-panel"

  const p = document.createElement("p")
  p.textContent = "Open this band’s SmugMug page:"
  panel.appendChild(p)

  const linkBtn = document.createElement("a")
  linkBtn.href = bandUrl
  linkBtn.target = "_blank"
  linkBtn.rel = "noopener"
  linkBtn.textContent = "Open on SmugMug ↗"
  linkBtn.className = "band-open-btn"
  panel.appendChild(linkBtn)

  wrapper.appendChild(panel)
  resultsEl.appendChild(wrapper)
}




// show ALL bands in a letter group
function showLetterBands(region, letter, bandsArr) {
  crumbsEl.textContent = `${region} › ${letter}`
  resultsEl.innerHTML = ""

  if (!bandsArr.length) {
    resultsEl.innerHTML = '<div class="empty">No bands in this group yet.</div>'
    return
  }
  
  

  bandsArr.forEach((bandObj) => {
    const bandDisplay = bandObj.name
    const logoUrl = resolveLogoUrl(bandDisplay)

    const card = document.createElement("article")
    card.className = "card"

    const thumb = document.createElement("div")
    thumb.className = "thumb"

    if (logoUrl) {
      const img = document.createElement("img")
      img.src = logoUrl
      img.alt = bandDisplay + " logo"
      thumb.appendChild(img)
    } else {
      const none = document.createElement("div")
      none.className = "empty"
      none.textContent = "N/A"
      thumb.appendChild(none)
    }

    // this used to be an <a> to SmugMug.
    // now it just calls our detail view
    const titleBtn = document.createElement("button")
    titleBtn.className = "small-link"
    titleBtn.textContent = bandDisplay
    titleBtn.style.fontSize = "18px"
    titleBtn.style.background = "transparent"
    titleBtn.style.border = "none"
    titleBtn.style.color = "inherit"
    titleBtn.style.textAlign = "left"
    titleBtn.style.cursor = "pointer"

    titleBtn.addEventListener("click", (e) => {
      e.preventDefault()
      // show the single-band view in the SAME area
      showBandCard(region, letter, bandObj)
    })

    card.append(thumb, titleBtn)
    resultsEl.appendChild(card)
  })
}


function buildTree() {
  treeEl.innerHTML = ""

  Object.entries(BANDS).forEach(([region, letters]) => {
    const regionDet = document.createElement("details")
    regionDet.className = "region"

    // summary with image for regions
    const regionSum = document.createElement("summary")
    const imgSrc = REGION_IMAGES[region]
    if (imgSrc) {
      const img = document.createElement("img")
      img.src = imgSrc
      img.alt = region
      img.style.height = "200px" // adjust size as you like
      img.style.objectFit = "contain"
      img.style.display = "block"
      regionSum.appendChild(img)
    } else {
      regionSum.textContent = region // fallback for any future regions
    }
    regionDet.appendChild(regionSum)

    // letters
    Object.entries(letters).forEach(([letter, bands]) => {
      const letterDet = document.createElement("details")
      letterDet.className = "letter"

      const letterSum = document.createElement("summary")
      letterSum.textContent = letter

      // clicking a letter (e.g. O-C) shows ALL bands on the right
      letterSum.addEventListener("click", () => {
        setTimeout(() => showLetterBands(region, letter, bands), 0)
      })

      letterDet.appendChild(letterSum)

      // keep your rule: only non–O-C letters list individual band buttons
      if (
        letter !== "O-C" &&
        letter !== "O-G" &&
        letter !== "D-G" &&
        letter !== "H-K" &&
        letter !== "H-M" &&
        letter !== "L-O" &&
        letter !== "N-S" &&
        letter !== "P-S" &&
        letter !== "T-Z" &&
        letter !== "All"
      ) {
        const ul = document.createElement("ul")
        if (!bands.length) {
          const li = document.createElement("li")
          li.textContent = `(Add bands for ${region} • ${letter})`
          ul.appendChild(li)
        } else {
          bands.forEach((b) => {
            const li = document.createElement("li")
            const btn = document.createElement("button")
            btn.textContent = b.name
            btn.addEventListener("click", () => showBandCard(region, letter, b))
            li.appendChild(btn)
            ul.appendChild(li)
          })
        }
        letterDet.appendChild(ul)
      }

      regionDet.appendChild(letterDet)
    })

    treeEl.appendChild(regionDet)
  })

  statusEl.textContent = "Static mode (GitHub hosted). Edit in script.js."
}

buildTree()
bindFilter()
