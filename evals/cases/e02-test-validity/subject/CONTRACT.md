# Pagination contract

nextPage(offset, limit, total) receives integers satisfying offset >= 0, limit > 0 and total >= 0, from the validated pagination adapter. Return offset + limit only when that value is strictly below total; otherwise return null. Strings, non-finite values and invalid adapter output are outside this module contract.
