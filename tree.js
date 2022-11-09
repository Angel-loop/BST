class Node {
  constructor(data, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}


class Tree{
    constructor(){
        this.root = null
    }

    buildTree(seeds){
        
        for(let i = 0; i < seeds.length; i++){
            this.insert(seeds[i])
        }
        
        
    }

    printTree(){
        const node = this.root
            const prettyPrint = function(node, prefix = '', isLeft = true) {
            if (node.right !== null) {
              prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
            }
            console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
            if (node.left !== null) {
              prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
            }
          }

          prettyPrint(node)
          
    }

    find(node){
        const root = this.root
        const findNode = (root, node) => {

            if (root == null ||
                root.data == node)
                return root;
         
            if (root.data < node)
               return findNode(root.right, node);
         
            return findNode(root.left, node);
        }

        return findNode(root, node)
    }

    insert(data){
        const node = this.root
        //If root is null, the tree is empty. Creates a new root
        if(node === null){
            this.root = new Node(data)
            return
        }else{
            const searchTree = (node)=>{
                //Called when data is less than root
                if(data < node.data){
                    //If true means we are on a leaf node and create a new node
                    if(node.left === null){
                        node.left = new Node(data)
                        return
                    //Else we recurse until we find the leaf node 
                    }else{
                       return searchTree(node.left)
                    }
                //Called when data is greater than root
                }else if(data > node.data){
                    if(node.right === null){
                        node.right = new Node(data)
                        return
                    }else{
                        return searchTree(node.right)
                    }
                //If data is the same as our root we return null to avoid adding duplicates
                }else{
                    return null
                }
            }
        return searchTree(node)
        }
    }

    delete(node){
        const root = this.root
        const deleteNode = (root, node) => {
            
            //base case, if the tree is empty
            if (root == null){
                return root
            }
            //Binary Search
            if(node > root.data){
                root.right = deleteNode(root.right, node)
            }else if(node < root.data){
                root.left = deleteNode(root.left, node)
            }else
            //If root is equal to node this is the one to be deleted 
            {
                //Cases for one child nodes or no child nodes
                if(root.left == null){
                    return root.right
                }else if(root.right == null){
                    return root.left
                }else{
                    // node with two children Get the inorder
                    // successor (smallest in the right subtree)  
                    root.data = this.minValue(root.right)
                    root.right = deleteNode(root.right, root.data)
                }
            }

            return root

        }

        deleteNode(root, node)

    }

    minValue(root = this.root){
    let minv = root.data;
    // to find the minimum value we simple loop through all left nodes
    // until we reach a leaf node
        while (root.left != null)
        {
            minv = root.left.data;
            root = root.left;
        }
        return minv;
    }

    maxValue(root = this.root){
    // to find the maximum value we simple loop through all right nodes
    // until we reach a leaf node
    let maxv = root.data;
        while (root.right != null)
        {
            maxv = root.right.data;
            root = root.right;
        }
        return maxv;
    }

    levelOrder(){
        // traverses the tree based on levels 
        // starting by the root
 
        let result = []
        let queue = []

        let root = this.root

        // base case, tree is empty
        if(root === null) 
        return root

        // pushes root to the queue
        queue.push(root)

        // loops as long as we have a node to visit
        while(queue.length > 0){
            
            root = queue[0]

            // since we traverse through the tree
            // by levels going from left to right
            // we check if there are left nodes to visit
            // and push it to queue
            if(root.left != null)
                queue.push(root.left)

            // same for right nodes
            if(root.right != null)
                queue.push(root.right)
            
            // then we visit the node by reading its value
            // and pushing it to our result array
            result.push(root.data)
                queue.shift()
        }
        return result
    }

    inOrder(){
        let root = this.root
        let visited = [] 
        
        const inOrderRec = (root, visited) =>{
        // base case, tree is empty, left/right node is null
            if(root === null){
                return
            }else{
        // finds the left most node and visits it,
        // then its root, the root's right subtree
                inOrderRec(root.left, visited)
                visited.push(root.data)
                inOrderRec(root.right, visited)
            }
            return visited
        }
        return inOrderRec(root, visited)
    }

    preOrder(){
        let root = this.root
        let visited = [] 
        const preOrderRec = (root, visited) =>{
            // base case, tree is empty, left/right node is null
            if(root === null){
                return
            // visits the root, then left subtree, then right subtree
            }else{   
                visited.push(root.data)
                preOrderRec(root.left, visited)
                preOrderRec(root.right, visited)
            }
            return visited
        }
        return preOrderRec(root, visited)
    }

    postOrder(){
        let root = this.root
        let visited = [] 
        const preOrderRec = (root, visited) =>{
            // base case, tree is empty, left/right node is null
            if(root === null){
                return
            }else{
            // finds leaves nodes and visits them
            // then its root, tree root is the last 
            // to be visited
                preOrderRec(root.left, visited)
                preOrderRec(root.right, visited)
                visited.push(root.data)
            }
            return visited
        }
        return preOrderRec(root, visited)
    }

    findMaxHeight(node = this.root.data){
        
        let root = this.find(node)

        const findHeightRec = (node)=>{
            if(node === null){
                return 0
            }
    
            return 1 + Math.max(findHeightRec(node.left), findHeightRec(node.right)) 
        }

       return findHeightRec(root)
    }

    findMinHeight(node = this.root.data){
        
        let root = this.find(node)

        const findHeightRec = (node)=>{
            if(node === null){
                return 0
            }

            //Base Case, Leaf Node
            if(node.left === null && node.right === null)
            return 1
            
            if(node.right === null)
            return 1 + findHeightRec(node.left)

            if(node.left === null)
            return 1 + findHeightRec(node.right)


            return 1 +  Math.min(findHeightRec(node.left), findHeightRec(node.right))  
        }

       return findHeightRec(root)
    }

    findDepth(node = this.root.data){
        const findDepthRec = (root,node)=>{
            if(root.data === node){
                return 1 
            }

            if(node > root.data){
                return 1 + findDepthRec(root.right, node)
            }

            return 1 + findDepthRec(root.left, node)
        }

        if(!this.find(node))
        return null
        

        return findDepthRec(this.root, node)
    }

    isBalanced(){
        let root = this.root
        if(!root){
            return false
        }

        return Math.abs(this.findMaxHeight() - this.findMinHeight()) > 1 ? false : true
        
    }
}



export default { Tree }
