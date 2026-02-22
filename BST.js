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
        let curr = this.root; //curr node track
        let prev = null; //prev node track

        while(curr.left !== null && curr.right !== null){
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

                    // take the max right value of the left subtree means min right value
                    curr = curr.left;
                    let next = curr;

                    // now the next is the right child of curr if the curr still have child
                    while(next.right !== null){
                        curr = next;
                        next = next.right;
                    }

                    let ans = next.data;
                    prev.data = ans;

                    //check whether the prev gright randchild is null or not
                    if(prev.left.right === null){
                        prev.left = null;
                        break;
                    }
                    //else remove the min right node
                    curr.right = null;
                    next = null;
                    break;
                }
            }
        }
    }
    
    constructor(arr){
        arr = this.#renewArr(arr);
        this.root = this.#buildTree(arr);
    }
}

let arr = [5, 10, 15, 20, 25, 30, 35, 45, 60, 55].sort((a, b) => a - b);
let item = new Tree(arr);
prettyPrint(item.root);
item.insert(26);
item.insert(24);
item.insert(27);
console.log("\n");
prettyPrint(item.root);
item.deleteItem(30);
console.log("\n");
prettyPrint(item.root);