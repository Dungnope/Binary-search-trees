import {prettyPrint, Tree, BstNode} from './BST.js';

// ==========================================
// BỘ TEST CASES CHO DELETE ITEM
// ==========================================

 console.log("=== TEST CASE 1: Xóa trong cây rỗng và Node không tồn tại ===");
 let tree1 = new Tree([]);
 tree1.deleteItem(10); // Cây rỗng, hàm phải thoát an toàn
 let tree1b = new Tree([10, 20, 30]);
 tree1b.deleteItem(100); // 100 không có trong cây
 console.log("Pass Test 1 (Không bị crash) \n")


 console.log("=== TEST CASE 2: Xóa Node lá (Leaf Node) ===");
 // Mảng [10, 20, 30] -> Root là 20, trái là 10, phải là 30
 let tree2 = new Tree([10, 20, 30]);
 console.log("Cây ban đầu:");
 prettyPrint(tree2.root);
 tree2.deleteItem(10); 
 console.log("Sau khi xóa 10 (Node lá):");
 prettyPrint(tree2.root);
 console.log("\n")


 console.log("=== TEST CASE 3: Xóa Node Gốc (Root) có 2 con ===");
 // Mảng [10, 20, 30, 40, 50] -> Root là 30
 let tree3 = new Tree([10, 20, 30, 40, 50]);
 console.log("Cây ban đầu:");
 prettyPrint(tree3.root);
 tree3.deleteItem(30); 
 console.log("Sau khi xóa Root 30:");
 prettyPrint(tree3.root);
 console.log("\n")


 console.log("=== TEST CASE 4: Successor là con phải trực tiếp ===");
 // Mảng [10, 20, 30, 40] -> Root là 20. Phải của 20 là 30. Trái của 30 là null.
 // Khi xóa 20, Successor của nó chính là 30 (nằm ngay sát bên phải).
 let tree4 = new Tree([10, 20, 30, 40]);
 console.log("Cây ban đầu:");
 prettyPrint(tree4.root);
 tree4.deleteItem(20);
 console.log("Sau khi xóa 20:");
 prettyPrint(tree4.root);

console.log("============================================");
console.log("         BỘ STRESS-TEST CHO DELETE          ");
console.log("============================================");

// Khởi tạo cây với 15 node để có 4 tầng
const bigArr = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150];
let bigTree = new Tree(bigArr);

console.log("=== TRẠNG THÁI 0: Cây BST ban đầu (Root là 80) ===");
prettyPrint(bigTree.root);
// Cây sẽ có Root là 80. Các node 40 và 120 ở tầng 2.

console.log("\n=== TEST CASE 5: Xóa Node lá ở sâu nhất (Xóa 50) ===");
bigTree.deleteItem(50);
prettyPrint(bigTree.root);
// Kỳ vọng: 50 biến mất. Node 60 giờ rơi vào trường hợp chỉ có 1 con (con phải là 70).

console.log("\n=== TEST CASE 6: Xóa Node có 1 con (Xóa 60) ===");
bigTree.deleteItem(60);
prettyPrint(bigTree.root);
// Kỳ vọng: Node 70 sẽ được kéo lên nối thẳng vào bên phải của node 40.

console.log("\n=== TEST CASE 7: Xóa Node 2 con ở nhánh sâu (Xóa 20) ===");
bigTree.deleteItem(20);
prettyPrint(bigTree.root);
// Kỳ vọng: Successor của 20 là 30 sẽ trồi lên. 
// QUAN TRỌNG: Node 10 (con trái của 20 cũ) KHÔNG được phép biến mất, nó phải nối vào con trái của 30.

console.log("\n=== TEST CASE 8: Xóa thẳng Node Gốc (Xóa 80) ===");
bigTree.deleteItem(80);
prettyPrint(bigTree.root);
// Kỳ vọng: Successor của 80 là 90 sẽ lên làm Root mới. 
// Đảm bảo toàn bộ cấu trúc khổng lồ bên trái (40, 30, 10...) và bên phải (120, 100, 140...) không bị sụp đổ.

console.log("\n=== TEST CASE 9: Xóa liên hoàn các node trụ cột ===");
bigTree.deleteItem(40);
bigTree.deleteItem(120);
bigTree.deleteItem(100);
prettyPrint(bigTree.root);
// Phá hủy hàng loạt các node ngã ba để xem logic nối dây (bypass) của bạn có bị rò rỉ bộ nhớ hay mất node nào không.

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