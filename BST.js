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


console.log("\n==================================================");
console.log("    PHẦN 3: CÁC EDGE CASES ẨN (HIDDEN BUGS)       ");
console.log("==================================================");

// ---------------------------------------------------------
// [TEST 10] Cây chỉ có 1 Node duy nhất và xóa chính nó
// ---------------------------------------------------------
console.log("\n[TEST 10] Xóa Node duy nhất của cây - Xóa 50");
let tree10 = new Tree([50]);
console.log("Cây ban đầu:");
prettyPrint(tree10.root);
tree10.deleteItem(50);
console.log("Sau khi xóa 50:");
prettyPrint(tree10.root); 
// Kỳ vọng: Hàm không bị crash (không báo lỗi Cannot read properties of null). 
// Kết quả in ra trống trơn (hoặc undefined) vì this.root đã trở thành null.


// ---------------------------------------------------------
// [TEST 11] Successor KHÔNG PHẢI là Node lá (Nó có con phải)
// ---------------------------------------------------------
console.log("\n[TEST 11] Successor có nhánh con bên phải - Xóa 50");
let tree11 = new Tree([50]); 
// Dựng cây thủ công để ép ra đúng trường hợp này
tree11.root.left = new BstNode(20);
tree11.root.right = new BstNode(80);
tree11.root.right.left = new BstNode(60); // 60 là Successor của 50
tree11.root.right.left.right = new BstNode(65); // Nhưng 60 lại có con phải là 65
tree11.root.right.right = new BstNode(90);

console.log("Cây ban đầu:");
prettyPrint(tree11.root);
tree11.deleteItem(50);
console.log("Sau khi xóa Root 50:");
prettyPrint(tree11.root);
// Kỳ vọng: Root mới là 60. 
// QUAN TRỌNG NHẤT: Node 65 không bị mất, mà nó phải được nối lên làm con trái của 80.
// Hình dáng nhánh phải sẽ là: 80 -> left: 65, right: 90.



// ---------------------------------------------------------
// [TEST 12] Cây lệch: Xóa Root và Successor là con trực tiếp
// ---------------------------------------------------------
console.log("\n[TEST 12] Cây lệch (Xóa Root, Successor là con phải trực tiếp) - Xóa 50");
// Mảng [20, 50, 80, 90] qua hàm buildTree của bạn sẽ tạo ra cây lệch:
// Root 50, Trái 20, Phải 80. Phải của 80 là 90.
let tree12 = new Tree([20, 50, 80, 90]);
console.log("Cây ban đầu:");
prettyPrint(tree12.root);
tree12.deleteItem(50);
console.log("Sau khi xóa Root 50:");
prettyPrint(tree12.root);
// Kỳ vọng: Root mới là 80. 
// Nhánh trái của 80 nối thẳng về 20. Nhánh phải của 80 vẫn giữ nguyên là 90.




export  {prettyPrint, Tree, BstNode};
