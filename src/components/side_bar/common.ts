export interface LeafNode {
  name: string;
  target?: string | Function;
}

export interface NonLeafNode {
  name: string;
  children: Array<NonLeafNode | LeafNode>;
}

export type TreeNode = LeafNode | NonLeafNode;

// export default {};
