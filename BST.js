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
    
    constructor(arr){
        arr = this.#renewArr(arr);
        this.root = this.#buildTree(arr);
    }
}

let item = new Tree([2, 5, 1, 6, 8]);
console.log(item.root);