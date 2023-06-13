import { useState, useContext } from 'react'
import { act } from 'react-dom/test-utils'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Key from './Key'
import { BoardContext, BoardContextProvider } from '../../contexts/BoardContext'
import {
  GameStateContext,
  GameStateContextProvider
} from '../../contexts/GameStateContext'
import {
  KeyBoardColorContext,
  KeyBoardColorContextProvider
} from '../../contexts/KeyboardColorContext'

const ContextWrapper = ({ children }) => {
  const {
    board,
    setBoard,
    currentRow,
    setCurrentRow,
    currentCol,
    setCurrentCol
  } = useContext(BoardContext)

  return (
    <>
      <p>Board: {board}</p>
      <p>Current Row: {currentRow}</p>
      <p>Current Col: {currentCol}</p>
      {children}
    </>
  )
}

const renderKeys = () => {
  const keys = ['p', 'r', 'a', 'n', 'k', 'enter', 'clear']
  return render(
    <GameStateContextProvider>
      <BoardContextProvider>
        <KeyBoardColorContextProvider>
          <ContextWrapper>
            {keys.map((keyValue, i) => (
              <Key keyValue={keyValue} key={i} />
            ))}
          </ContextWrapper>
        </KeyBoardColorContextProvider>
      </BoardContextProvider>
    </GameStateContextProvider>
  )
}
test('key is rendered', () => {
  renderKeys()

  const element = screen.getByText('a')
  expect(element).toBeDefined()
})

describe('Button press functionality:', () => {
  test('letter keys are functional', async () => {
    renderKeys()

    const user = userEvent.setup()
    const button = screen.getByText('a')
    await user.click(button)

    const currentColText = screen.getByText(/Current Col:/)
    const currentCol = parseInt(currentColText.textContent.split(': ')[1])
    expect(currentCol).toEqual(1)
  })

  test('clear key is functional', async () => {
    renderKeys()

    const user = userEvent.setup()
    const letterButton = screen.getByText('a')
    const clearButton = screen.getByText('clear')

    await user.click(letterButton)

    const colTextBeforeClear = screen.getByText(/Current Col:/)
    const colBeforeClear = parseInt(
      colTextBeforeClear.textContent.split(': ')[1]
    )
    expect(colBeforeClear).toEqual(1)

    await user.click(clearButton)

    const colTextAfterClear = screen.getByText(/Current Col:/)
    const colAfterClear = parseInt(colTextAfterClear.textContent.split(': ')[1])
    expect(colAfterClear).toEqual(0)
  })

  test('enter key is not functional when current row is not full', async () => {
    renderKeys()

    const user = userEvent.setup()
    const enterButton = screen.getByText('enter')

    await user.click(screen.getByText('p'))
    await user.click(enterButton)

    const currentRowText = screen.getByText(/Current Row:/)
    const currentRow = parseInt(currentRowText.textContent.split(': ')[1])
    expect(currentRow).toEqual(0)
  })

  test('enter key is functional when row is full', async () => {
    renderKeys()

    const user = userEvent.setup()
    const enterButton = screen.getByText('enter')

    //made sure to type in a proper word for when word checking from backend is implemented
    await user.click(screen.getByText('p'))
    await user.click(screen.getByText('r'))
    await user.click(screen.getByText('a'))
    await user.click(screen.getByText('n'))
    await user.click(screen.getByText('k'))

    const currentRowTextBefore = screen.getByText(/Current Row:/)
    const currentRowBefore = parseInt(
      currentRowTextBefore.textContent.split(': ')[1]
    )
    expect(currentRowBefore).toEqual(0)

    await user.click(enterButton)

    const currentRowTextAfter = screen.getByText(/Current Row:/)
    const currentRowAfter = parseInt(
      currentRowTextAfter.textContent.split(': ')[1]
    )
    expect(currentRowAfter).toEqual(1)
  })
})

test('returns the correct background color for orange keys', () => {
  const greenKeys = new Set(['p', 'r', 'a'])
  const orangeKeys = new Set(['n', 'k'])
  const greyKeys = new Set(['enter', 'clear'])
  const keys = ['p', 'r', 'a', 'n', 'k', 'enter', 'clear']

  render(
    <GameStateContextProvider>
      <BoardContextProvider>
        <KeyBoardColorContextProvider
          value={{ greenKeys, orangeKeys, greyKeys }}
        >
          <ContextWrapper>
            {keys.map((keyValue, i) => (
              <Key keyValue={keyValue} key={i} />
            ))}
          </ContextWrapper>
        </KeyBoardColorContextProvider>
      </BoardContextProvider>
    </GameStateContextProvider>
  )

  const keyButton = screen.getByText('k')
  expect(keyButton).toHaveStyle('background-color: var(--orange)')
})
