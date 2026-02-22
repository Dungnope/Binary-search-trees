//test tree
const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
}


class BstNode{
    constructor(data){

        this.data = data === undefined ? 0 : data;
        this.left = null;
        this.right = null;
    }
}

class Tree{

    #renewArr(arr){
        const removeDuplicate = new Set(arr);
        let newArr = [];
        removeDuplicate.forEach(item => {
            newArr.push(item);
        })
        return newArr;
    }

    #buildTree(arr){
        let start = 0;
        let end = arr.length - 1;
        let mid = Math.floor((start + end) / 2);
        if(start > end) return null;
        
        let rootNode = new BstNode(arr[mid]);
        rootNode.left = this.#buildTree(arr.slice(start, mid));
        rootNode.right = this.#buildTree(arr.slice(mid+1, arr.length));
        return rootNode;
    }

    includes(value){
        let queue = [];
        let curr = this.root;
        queue.push(curr);
        while(queue.length !== 0){
            if(queue.at(0).data === value) return true;
            if(curr.left !== null) queue.push(curr.left);
            if(curr.right !== null) queue.push(curr.right);
            queue.shift();
            curr = queue.at(0);
        }
        return false;
    }

    insert(value){
        if(this.includes(value)) return;
        
        let curr = this.root;
        while(curr.left !== null && curr.right !== null){
            if(value < curr.data) curr = curr.left;
            else curr = curr.right;
        }
        if(value < curr.data) curr.left = new BstNode(value);
        else curr.right = new BstNode(value);
    }

    //iterative delete item
    deleteItem(value){
        if(!this.includes(value)) return;
        if(this.root === null) return;
        if(this.root.left === null && this.root.right === null){
            this.root.data = undefined;
            return;
        }

        let curr = this.root; //curr node track
        let prev = null; //prev node track

        while(curr !== null){
            if(value < curr.data)
            {
                prev = curr;
                curr = curr.left;
            }
            else if(value > curr.data)
            { 
                prev = curr;
                curr = curr.right;
            }
            //if founding the value
            else{
                //no leaf child
                if(curr.left === null && curr.right === null){
                    //check to delete child of parent node
                    if(prev.left !== null && prev.left.data === curr.data) prev.left = null;
                    else if(prev.right !== null && prev.right.data === curr.data) prev.right = null;
                    curr = null;
                    break;
                }
                //if have one child
                    //if the node on the right side
                else if(curr.left === null){
                    if(prev.data > curr.data){
                        prev.left = curr.right;
                        curr = null;
                    }
                    else{
                        prev.right = curr.right;
                        curr = null;
                    }
                }
                    //if the node on the left side
                else if(curr.right === null){
                    if(prev.data > curr.data){
                        prev.left = curr.left;
                        curr = null;
                    }
                    else{
                        prev.right = curr.left;
                        curr = null;
                    }
                }
                //if have two children
                else if(curr.left !== null && curr.right !== null){

                    prev = curr; // keep delete position

                    // take the min right value of the right subtree means min left value
                    curr = curr.right;
                    let next = curr;

                    while(next.left !== null){
                        curr = next;
                        next = next.left;
                    }

                    //change data of root
                    prev.data = next.data;

                    //case the smallest 
                    if(prev.left !== null && prev.left.data === next.data)
                    { 
                        prev.left = curr.left;
                    }
                    else if(prev.right !== null && prev.right.data === next.data) 
                    {
                        prev.right = curr.right;
                    }

                    //check if the leaf has child or not
                    if(curr.left !== null && curr.left.data === next.data && next.left !== null)
                    {
                        curr.left = next.left;
                        break;
                    }
                    else if(curr.left !== null && curr.left.data === next.data && next.right !== null)
                    {
                        curr.left = next.right;
                        break;
                    }
                    else if(next.right === null && next.left === null)
                    {
                        curr.left = null;
                        break;
                    }

                    if(curr.right !== null && curr.right.data === next.data && next.left !== null)
                    { 
                        curr.right = next.left;
                        break;
                    }

                    else if(curr.right !== null && curr.right.data === next.data && next.right !== null)
                    { 
                        curr.right = next.right;
                        break;
                    }

                    else if(next.right === null && next.left === null)
                    {
                        curr.right = null;
                        break;
                    }
                    break;
                }
            }
        }
    }
    
    constructor(arr){
        arr = this.#renewArr(arr); //delete duplicate item
        arr = arr.sort((a, b) => a - b); // sort arr smallest to largest
        this.root = null;
        if(arr.length === 0) 
        {
            this.root =  new BstNode(null);
        }
        else this.root = this.#buildTree(arr);
    }
}







export  {prettyPrint, Tree, BstNode};
