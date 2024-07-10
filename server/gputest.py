
import tensorflow as tf
import time

# Check if GPU is available
if tf.config.list_physical_devices('GPU'):
    print("GPU is available.")
else:
    print("GPU is not available.")

# Set the size of the matrices
MATRIX_SIZE = 10000

SEED = 42

# Create two large random matrices with a seed
tf.random.set_seed(SEED)
matrix1 = tf.random.uniform((MATRIX_SIZE, MATRIX_SIZE), minval=0, maxval=1, dtype=tf.float32)
matrix2 = tf.random.uniform((MATRIX_SIZE, MATRIX_SIZE), minval=0, maxval=1, dtype=tf.float32)


# Perform matrix multiplication and measure time
start_time = time.time()
result = tf.matmul(matrix1, matrix2)
end_time = time.time()

print(f"Time taken for matrix multiplication of size {MATRIX_SIZE}x{MATRIX_SIZE}: {end_time - start_time} seconds")

