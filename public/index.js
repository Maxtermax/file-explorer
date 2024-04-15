function App({ notify }) {
  const increment = () => {
    notify({
      value: {
        type: INCREMENT,
      },
    });
  };

  const decrement = () => {
    notify({
      value: {
        type: DECREMENT,
      },
    });
  };

  return (
    <div>
      <Counter />
      <RenderTracker />
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
};
export default withNotify(App, {
  context: CounterContext,
  observer: CounterObserver
});
