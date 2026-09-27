import { render } from '@testing-library/react';
import { ListMenu } from '../../src/components/ListMenu';

const list = [{ label: 'One' }, { label: 'Two' }];

describe('ListMenu ids', () => {
  it('should use the id from the menu prop when given', () => {
    render(
      <ListMenu
        menu={{ open: true, anchorEl: document.body, list, id: 'my-menu' }}
        toggle={vi.fn()}
        navigate={vi.fn()}
      />,
    );
    expect(document.getElementById('my-menu')).toBeInTheDocument();
  });

  it('should give two menus without ids distinct generated ids', () => {
    render(
      <>
        <ListMenu
          menu={{ open: true, anchorEl: document.body, list }}
          toggle={vi.fn()}
          navigate={vi.fn()}
        />
        <ListMenu
          menu={{ open: true, anchorEl: document.body, list }}
          toggle={vi.fn()}
          navigate={vi.fn()}
        />
      </>,
    );
    const ids = Array.from(document.querySelectorAll('.MuiMenu-root'))
      .map((el) => el.id)
      .filter(Boolean);
    expect(ids.length).toBeGreaterThanOrEqual(2);
    expect(new Set(ids).size).toBe(ids.length);
  });
});
