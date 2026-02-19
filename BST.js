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
        while(curr.left !== null || curr.right !== null){
            if(value < curr.data) curr = curr.left;
            else curr = curr.right;
        }
        if(value < curr.data) curr.left = new BstNode(value);
        else curr.right = new BstNode(value);
    }

    deleteItem(value){
        if(!this.includes(value)) return;

        let fast = this.root;
        let slow = this.root;

        //check if value is root element

        const inorderSuccessor = (curr) => {
            curr = curr.left;
            while(curr != null && curr.right != null){
                curr = curr.right;
            }
            return curr;
        }

        if(value < fast.data){
            fast = fast.left;
        }
        else if(value > fast.data) fast = fast.right;
        else{
            //this is root value so use the largestRight node is the highest node of subleft
            let curr = this.root;
            let largestRight = inorderSuccessor(curr);
            fast.data = largestRight.data;
            if(fast.right.left !== null) fast = fast.left;

            if(fast.right.right !== null){
                fast = fast.right;
            }
            fast.right = null;
        }
        

        while(fast !== null && slow !== null){

            if(value < fast.data){
                slow = fast;
                fast = fast.left;
            }
            else if(value > fast.data){
                slow = fast;
                fast = fast.right;
            }

            //if found the value
            else{

                //the leaf node
                if(fast.left === null && fast.right === null){
                    if(slow.data > value) slow.left = null;
                    else slow.right = null;
                    fast = fast.right;
                    break;
                }

                //if have 1 child
                    //left side
                if((fast.left !== null && fast.right === null) && value < slow.data){
                    slow.left = fast.left;
                    fast = null;
                    break;
                }
                else if((fast.left !== null && fast.right === null) && value > slow.data){
                    slow.right = fast.left;
                    fast = null;
                    break;
                }
                    //right side
                else if((fast.left === null && fast.right !== null) && value < slow.data){
                    slow.left = fast.right;
                    fast = null;
                    break;
                }
                else if((fast.left === null && fast.right !== null) && value > slow.data){
                    slow.right = fast.right;
                    fast = null;
                    break;
                }

                //if have 2 children
                if(fast.left !== null && fast.right !== null){
    
                    let largestleft = inorderSuccessor(fast);
                    fast.data = largestleft.data;
                    
                    //case the child have only one childe
                    if(fast.left.left !== null){
                        fast = fast.left;
                    }else {fast.left = null; continue;}
                    
                    if(fast.right !== null){
                        fast = fast.right;
                    }
                    
                }
            }
        }
    }
    
    constructor(arr){
        arr = this.#renewArr(arr);
        this.root = this.#buildTree(arr);
    }
}

let arr = [30, 1, 84, 9, 8, 80, 83].sort((a, b) => a - b);
let item = new Tree(arr);
prettyPrint(item.root);
item.deleteItem(84);
item.deleteItem(70);
prettyPrint(item.root);