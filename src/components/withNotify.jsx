/* eslint-disable react/display-name */

export default function withNotify(Component, { context, observer }) {
  const notify = (value) => observer.notify({ context, value });
  return (props) => <Component notify={notify} {...props} />;
}
