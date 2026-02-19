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
        const removeDuplicate = new Set(arr.toSorted());
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
    
    constructor(arr){
        arr = this.#renewArr(arr);
        this.root = this.#buildTree(arr);
    }
}


let item = new Tree([1, 6, 5, 2, 8]);
item.insert(12);
console.log(item);