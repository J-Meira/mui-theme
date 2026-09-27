import { render, screen, waitFor } from '@testing-library/react';
import { SideBarItem } from '../../src/components/SideBarItem';

describe('SideBarItem collapse on sidebar collapse', () => {
  it('should close an open item when expanded turns false', async () => {
    const { rerender } = render(
      <SideBarItem label='Parent Item' initialState expanded>
        <SideBarItem label='Child Item' secondary />
      </SideBarItem>,
    );
    expect(screen.getByText('Child Item')).toBeInTheDocument();

    rerender(
      <SideBarItem label='Parent Item' initialState expanded={false}>
        <SideBarItem label='Child Item' secondary />
      </SideBarItem>,
    );
    await waitFor(() =>
      expect(screen.queryByText('Child Item')).not.toBeInTheDocument(),
    );
  });

  it('should start open with initialState even without an expanded prop', () => {
    render(
      <SideBarItem label='Parent Item' initialState>
        <SideBarItem label='Child Item' secondary />
      </SideBarItem>,
    );
    expect(screen.getByText('Child Item')).toBeInTheDocument();
  });
});
