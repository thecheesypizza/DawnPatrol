#!/bin/bash
# Run every suite sequentially from the repository root. Exit codes are always 0; check: grep "^FAIL " suite_*.out
cd "$(dirname "$0")/.." || exit 1
bash build.sh >/dev/null || exit 1
rm -f suites.log suites.done
for t in test_app test_tide test_swin test_report; do
  timeout 600 python3 tests/$t.py > suite_$t.out 2>&1; echo "$t exit $?" >> suites.log
done
for f in worker/test7.mjs worker/test8.mjs worker/test9.mjs worker/test_docs.mjs; do node $f > suite_$(basename $f).out 2>&1; echo "$f exit $?" >> suites.log; done
echo done > suites.done
grep -H "^FAIL " suite_*.out || echo "no failures"
