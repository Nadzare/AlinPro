// Pindah Fungsi Class Pas di Scroll atau pindah slide
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');


window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id +']').classList.add('active');
            });
        };
    });
    // Sticky Navbar
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    //Hapus toggle icon dan navbar ketika di klik navbar link(scroll)
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

};




//Untuk bagian section proyek kalkulator matriks
let ordoMatrix = 3; // Awal muncul tampilan ordo matriks 3x3

// Membuat elemen input untuk matriks
function membuatInputanMatriks(tableId) {
  const table = document.getElementById(tableId);
  table.querySelector('tbody').innerHTML = '';
  for (let i = 0; i < ordoMatrix; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < ordoMatrix; j++) {
      const cell = document.createElement('td');
      const input = document.createElement('input');
      input.type = 'number';
      // input.value = 0;
      cell.appendChild(input);
      row.appendChild(cell);
    }
    table.querySelector('tbody').appendChild(row);
  }
}

// Mengambil matriks dari input
function mengambilMatrix(tableId) {
  const inputs = document.querySelectorAll(`#${tableId} input`);
  const matrix = [];
  let isValid = true; 

  inputs.forEach((input, index) => {
    const row = Math.floor(index / ordoMatrix);
    if (!matrix[row]) matrix[row] = [];
    const value = input.value.trim(); 

    if (value === '') {
      isValid = false; 
    }
    matrix[row].push(Number(value) || 0); 
  });

  if (!isValid) {
    alert('Semua input harus diisi sebelum melakukan operasi perhitungan.');
    return null; 
  }

  return matrix;
}

// Menampilkan hasil matriks
function menampilkanHasil(matrix) {
  const resultTable = document.getElementById('resultMatrix');
  resultTable.querySelector('tbody').innerHTML = '';
  for (let i = 0; i < matrix.length; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < matrix[i].length; j++) {
      const cell = document.createElement('td');
      cell.textContent = matrix[i][j];
      row.appendChild(cell);
    }
    resultTable.querySelector('tbody').appendChild(row);
  }
}

// Operasi Matriks
function tambahMatriks() {
  const A = mengambilMatrix('matrixA');
  const B = mengambilMatrix('matrixB');
  if (!A || !B) return; 

  const result = A.map((row, i) => row.map((val, j) => val + B[i][j]));
  menampilkanHasil(result);
}

function kurangiMatriks() {
  const A = mengambilMatrix('matrixA');
  const B = mengambilMatrix('matrixB');
  if (!A || !B) return; 

  const result = A.map((row, i) => row.map((val, j) => val - B[i][j]));
  menampilkanHasil(result);
}

function kalikanMatrices() {
  const A = mengambilMatrix('matrixA');
  const B = mengambilMatrix('matrixB');
  if (!A || !B) return; 

  const result = Array.from({ length: ordoMatrix }, () =>
    Array(ordoMatrix).fill(0)
  );
  for (let i = 0; i < ordoMatrix; i++) {
    for (let j = 0; j < ordoMatrix; j++) {
      for (let k = 0; k < ordoMatrix; k++) {
        result[i][j] += A[i][k] * B[k][j];
      }
    }
  }
  menampilkanHasil(result);
}

// Mengubah ordo matriks
function mengubahOrdo(increment) {
  ordoMatrix = Math.max(2, ordoMatrix + increment);
  membuatInputanMatriks('matrixA');
  membuatInputanMatriks('matrixB');

  document.getElementById('orderDisplay').textContent = ordoMatrix;
}


// Menampilkan hasil transpose matriks
function displayTranspose(matrix, tableId) {
  const table = document.getElementById(tableId);
  table.querySelector('tbody').innerHTML = '';
  for (let i = 0; i < matrix.length; i++) {
    const row = document.createElement('tr');
    for (let j = 0; j < matrix[i].length; j++) {
      const cell = document.createElement('td');
      cell.textContent = matrix[i][j];
      row.appendChild(cell);
    }
    table.querySelector('tbody').appendChild(row);
  }
}

// Fungsi menghitung transpose matriks
function transposeMatrix(matrix) {
  const transpose = [];
  for (let i = 0; i < matrix[0].length; i++) {
    transpose.push([]);
    for (let j = 0; j < matrix.length; j++) {
      transpose[i].push(matrix[j][i]);
    }
  }
  return transpose;
}

// Operasi transpose untuk matriks A
function transposeMatrixA() {
  const A = mengambilMatrix('matrixA');
  if (!A) return;

  const result = transposeMatrix(A);
  displayTranspose(result, 'resultMatrix');
}

// Operasi transpose untuk matriks B
function transposeMatrixB() {
  const B = mengambilMatrix('matrixB');
  if (!B) return; 

  const result = transposeMatrix(B);
  displayTranspose(result, 'resultMatrix');
}



function resetMatrix(tableId) {
  const inputs = document.querySelectorAll(`#${tableId} input`);
  inputs.forEach((input) => {
    input.value = '';
  });
}

function mengubahSemuaMatriks() {
  resetMatrix('matrixA');
  resetMatrix('matrixB');
  document.getElementById('resultMatrix').querySelector('tbody').innerHTML = '';
}




// Inisialisasi
document.addEventListener('DOMContentLoaded', () => {
  membuatInputanMatriks('matrixA');
  membuatInputanMatriks('matrixB');
});
