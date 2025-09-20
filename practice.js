//電腦科學中String的subsequence是指，可以通過刪除零個或多個元素而不改變剩餘元素的順序，從而產生的新的String，就是原先String的subsequence。例如: book是brooklyn的subsequence。
//寫出一個被稱為 isSubsequence 的函式。此函式能夠給定任兩個String，並且回傳一個 boolean 值，判斷第一個string是不是第二個string的subsequence。
function isSubsequence(str1, str2) {
  if (str1.length == 0) {
    return true;
  }

  let i = 0;
  let j = 0;
  while (j < str2.length) {
    if (str1[i] == str2[j]) {
      i++;
    }
    if (i >= str1.length) {
      return true;
    }
    j++;
  }
  return false;
}

console.log(isSubsequence("book", "brooklyn")); // true
console.log(isSubsequence("CAATCGA", "TCAATCAGGATCCGCTGA")); // true
console.log(isSubsequence("AATTAA", "TCAATCAGGATCCGCTGA")); // false
