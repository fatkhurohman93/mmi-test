-- SOAL NO 1

SELECT * FROM `barang` WHERE `harga` > 10000;

-- SOAL NO 2
SELECT * FROM `pelanggan` 
WHERE `nama` LIKE "%g%"
AND `alamat` = "BANDUNG";

-- SOAL NO 3
SELECT `transaksi`.`kode`, `transaksi`.`tanggal`, `pelanggan`.`nama` as `nama pelanggan`, `barang`.`nama` as `nama barang`, `transaksi`.`jumlah_barang` as `jumlah`, `barang`.`harga` as `harga satuan`, `transaksi`.`jumlah_barang`*`barang`.`harga` as `total`
FROM `transaksi` 
INNER JOIN `pelanggan` ON `transaksi`.`kode_pelanggan` = `pelanggan`.`kode`
INNER JOIN `barang` ON `transaksi`.`kode_barang` = `barang`.`kode`
ORDER BY `pelanggan`.`nama` ASC, `transaksi`.`kode`  ASC;

-- SOAL NO 4
SELECT `pelanggan`.`nama` as `nama pelanggan`, SUM(`transaksi`.`jumlah_barang`) as `jumlah`, SUM(`transaksi`.`jumlah_barang`*`barang`.`harga`) as `total`
FROM `transaksi` 
INNER JOIN `pelanggan` ON `transaksi`.`kode_pelanggan` = `pelanggan`.`kode`
INNER JOIN `barang` ON `transaksi`.`kode_barang` = `barang`.`kode`
GROUP BY `pelanggan`.`nama`
ORDER BY `pelanggan`.`nama`  ASC;
