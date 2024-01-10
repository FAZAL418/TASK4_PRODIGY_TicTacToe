import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, SafeAreaView, Button } from 'react-native';

const initialBoard = Array(9).fill(null);

const App = () => {
  const [board, setBoard] = useState(initialBoard);
  const [isXNext, setIsXNext] = useState(true);
  const [winningLine, setWinningLine] = useState([]);

  const checkWinner = () => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (board[a] !== null && board[a] === board[b] && board[a] === board[c]) {
        setWinningLine(lines[i]);
        return board[a];
      }
    }

    return null;
  };

  const handleSquarePress = (index) => {
    if (board[index] || checkWinner()) {
      return; 
    }

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';

    setBoard(newBoard);
    setIsXNext(!isXNext);

    const winner = checkWinner();
    if (winner) {
      Alert.alert(`Player ${winner} wins!`);
      setBoard(initialBoard);
      setWinningLine([]);
    } else if (!newBoard.includes(null)) {
      Alert.alert('It\'s a draw!');
      setBoard(initialBoard);
      setWinningLine([]);
    }
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setIsXNext(true);
    setWinningLine([]);
  };

  const renderSquare = (index) => {
    const isWinningSquare = winningLine.includes(index);

    return (
      <TouchableOpacity
        style={[
          styles.square,
          isWinningSquare ? { backgroundColor: '#FFD700' } : null,
          (index % 3 !== 0) ? { borderLeftWidth: 2 } : null,
          (index < 6) ? { borderBottomWidth: 2 } : null,
        ]}
        onPress={() => handleSquarePress(index)}
      >
        <Text style={styles.squareText}>{board[index]}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.page}>
      <View style={styles.container}>
        <Text style={styles.textT}>T</Text>
        <Text style={styles.textIC}>IC</Text>
        <Text style={styles.textT}>T</Text>
        <Text style={styles.textAC}>AC</Text>
        <Text style={styles.textTOE}>TOE</Text>
      </View>
      <View style={styles.board}>
        <View style={styles.row}>
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </View>
        <View style={styles.row}>
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </View>
        <View style={styles.row}>
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </View>
      </View>
      <Button title="Play Again" onPress={resetGame} style={styles.playAgainButton} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  page: {
    backgroundColor: '#fff', 
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 20,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10, 
    marginBottom: 50,
    backgroundColor: 'white',   
    paddingVertical: 20, 
    paddingHorizontal: 30, 
    borderRadius: 15, 
    elevation: 5, 
  },
  textT: {
    fontSize: 40, 
    fontWeight: 'bold',
    color: '#FF6347',
  },
  textIC: {
    fontSize: 40, 
    fontWeight: 'bold',
    color: '#2E8B57',
  },
  textAC: {
    fontSize: 40, 
    fontWeight: 'bold',
    color: '#4169E1',
  },
  textTOE: {
    fontSize: 40, 
    fontWeight: 'bold',
    color: '#FFD700',
  },
  board: {
    marginTop: 20,
    marginBottom: 70,
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#38414e', 
    borderWidth: 2,
    borderColor: '#5c6773', 
  },
  squareText: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
  },
  playAgainButton: {
    marginTop: 20,
    marginBottom: 20,
    backgroundColor: '#FF6347', 
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 8, 
    elevation: 3, 
  },
});


export default App;
