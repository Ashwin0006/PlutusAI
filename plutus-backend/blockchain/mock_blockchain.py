import hashlib
import json
from time import time
from typing import List, Dict

class Block:
    def __init__(self, index: int, previous_hash: str, timestamp: float, data: Dict, nonce: int = 0):
        self.index = index
        self.previous_hash = previous_hash
        self.timestamp = timestamp
        self.data = data
        self.nonce = nonce
        self.hash = self.calculate_hash()

    def calculate_hash(self) -> str:
        block_string = json.dumps(self.__dict__, sort_keys=True).encode()
        return hashlib.sha256(block_string).hexdigest()

    def __repr__(self):
        return f"Block(index={self.index}, hash={self.hash}, previous_hash={self.previous_hash}, data={self.data})"


class Blockchain:
    def __init__(self):
        self.chain: List[Block] = []
        self.create_genesis_block()

    def create_genesis_block(self):
        """
        Create the first block in the blockchain (genesis block).
        """
        genesis_block = Block(0, "0", time(), {"message": "Genesis Block"})
        self.chain.append(genesis_block)

    def add_block(self, data: Dict):
        """
        Add a new block to the blockchain.
        """
        last_block = self.chain[-1]
        new_block = Block(
            index=last_block.index + 1,
            previous_hash=last_block.hash,
            timestamp=time(),
            data=data
        )
        self.chain.append(new_block)

    def is_chain_valid(self) -> bool:
        """
        Validate the integrity of the blockchain.
        """
        for i in range(1, len(self.chain)):
            current_block = self.chain[i]
            previous_block = self.chain[i - 1]

            # Check if the current block's hash is valid
            if current_block.hash != current_block.calculate_hash():
                return False

            # Check if the previous hash matches
            if current_block.previous_hash != previous_block.hash:
                return False

        return True

    def __repr__(self):
        return f"Blockchain(chain={self.chain})"


# Singleton Blockchain Instance
blockchain = Blockchain()

"""
curl command to add a policy to the blockchain
"""
# curl -X POST http://127.0.0.1:5000/add-policy \
#      -H "Content-Type: application/json" \
#      -d '{"policy_id": "123", "details": "Sample Policy"}'