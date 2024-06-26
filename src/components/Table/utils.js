export const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
};

export function emptyRows(page, rowsPerPage, arrayLength) {
  return page ? Math.max(0, (1 + page) * rowsPerPage - arrayLength) : 0;
}

function descendingComparator(a, b, orderBy) {
  if (a[orderBy] === null) {
    return 1;
  }
  if (b[orderBy] === null) {
    return -1;
  }
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}
export function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

export function applyFilter({ inputData, comparator, filterName }) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (input) => input?.employees_name ? (input?.employees_name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1)
        : input?.ten_khach_hang ? (input?.ten_khach_hang.toLowerCase().indexOf(filterName.toLowerCase()) !== -1)
          : input?.ten ? (input?.ten.toLowerCase().indexOf(filterName.toLowerCase()) !== -1)
            : input?.ten_ke_hoach ? (input?.ten_ke_hoach.toLowerCase().indexOf(filterName.toLowerCase()) !== -1)
              : input?.name ? (input?.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1)
                : input?.file_name ? (input?.file_name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1)
                  : input?.MaHopDongVayVon ? (input?.MaHopDongVayVon.toLowerCase().indexOf(filterName.toLowerCase()) !== -1)
                    : input?.ten_tai_san ? (input?.ten_tai_san.toLowerCase().indexOf(filterName.toLowerCase()) !== -1)
                      : input?.NganhKinhTe ? (input?.NganhKinhTe.toLowerCase().indexOf(filterName.toLowerCase()) !== -1)
                        : (input?.priority_name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1)
    );
  }

  return inputData;
}
