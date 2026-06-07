import { useEffect, useState, useMemo } from 'react';

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function GithubHeatmap({ username }) {
  const currentYear = new Date().getFullYear();
  const [selectedYear, setSelectedYear] = useState(currentYear);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  // Generate years list (current year and previous 2 years)
  const yearsList = useMemo(() => {
    const list = [];
    for (let y = currentYear; y >= currentYear - 2; y--) {
      list.push(y);
    }
    return list;
  }, [currentYear]);

  // Mock data generator for offline/rate-limit fallback
  const mockData = useMemo(() => {
    const mockYears = {};
    yearsList.forEach(year => {
      const dataList = [];
      let total = 0;
      
      const isCurrent = year === currentYear;
      const startDate = isCurrent 
        ? new Date(new Date().getTime() - 364 * 24 * 60 * 60 * 1000)
        : new Date(`${year}-01-01`);
        
      let seed = year === 2026 ? 42 : year === 2025 ? 101 : 202;
      const random = () => {
        const x = Math.sin(seed++) * 10000;
        return x - Math.floor(x);
      };

      for (let i = 0; i < 365; i++) {
        const currentDate = new Date(startDate.getTime() + i * 24 * 60 * 60 * 1000);
        
        // Only count up to today for current year mock data
        if (isCurrent && currentDate > new Date()) continue;
        
        const dayOfWeek = currentDate.getDay();
        let probability = 0.55;
        if (dayOfWeek === 0 || dayOfWeek === 6) probability = 0.15;
        
        const weekIndex = Math.floor(i / 7);
        if (weekIndex % 8 === 0 || weekIndex % 8 === 3) probability += 0.3;
        
        let level = 'NONE';
        let count = 0;
        
        if (random() < probability) {
          const r = random();
          if (r < 0.5) {
            level = 'FIRST_QUARTILE';
            count = Math.floor(random() * 2) + 1;
          } else if (r < 0.8) {
            level = 'SECOND_QUARTILE';
            count = Math.floor(random() * 2) + 3;
          } else if (r < 0.95) {
            level = 'THIRD_QUARTILE';
            count = Math.floor(random() * 2) + 5;
          } else {
            level = 'FOURTH_QUARTILE';
            count = Math.floor(random() * 4) + 7;
          }
          total += count;
        }

        dataList.push({
          date: currentDate.toDateString(),
          contributionCount: count,
          contributionLevel: level,
        });
      }

      const weeks = [];
      for (let i = 0; i < dataList.length; i += 7) {
        weeks.push(dataList.slice(i, i + 7));
      }

      mockYears[year] = {
        totalContributions: total || 149,
        contributions: weeks
      };
    });
    return mockYears;
  }, [yearsList, currentYear]);

  useEffect(() => {
    if (!username) return;
    Promise.resolve().then(() => {
      setLoading(true);
      setError(false);
    });

    let url = `https://github-contributions-api.deno.dev/${username}.json`;
    if (selectedYear !== currentYear) {
      url += `?from=${selectedYear}-01-01&to=${selectedYear}-12-31`;
    }

    fetch(url)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch contributions');
        return res.json();
      })
      .then((json) => {
        if (json && json.contributions) {
          setData(json);
        } else {
          throw new Error('Invalid contributions data');
        }
      })
      .catch((err) => {
        console.error('Error fetching GitHub contribution heatmap:', err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [username, selectedYear, currentYear]);

  const activeData = useMemo(() => {
    if (loading || error || !data) {
      return mockData[selectedYear] || mockData[currentYear];
    }
    return data;
  }, [data, loading, error, mockData, selectedYear, currentYear]);

  const getCellColor = (level) => {
    switch (level) {
      case 'FIRST_QUARTILE': return '#9ca3af'; // level 1: medium-light slate
      case 'SECOND_QUARTILE': return '#6b7280'; // level 2: medium slate
      case 'THIRD_QUARTILE': return '#374151';  // level 3: dark slate
      case 'FOURTH_QUARTILE': return '#000000';  // level 4: pure black (theme accent)
      default: return '#e5e7eb';                 // level 0: visible light grey
    }
  };

  const formatDate = (dateStr) => {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  // monthNames defined at module scope

  const monthLabels = useMemo(() => {
    if (!activeData || !activeData.contributions) return [];
    const labels = [];
    let lastMonth = -1;
    
    activeData.contributions.forEach((week, weekIdx) => {
      const firstDayWithDate = week.find(d => d.date);
      if (firstDayWithDate) {
        const date = new Date(firstDayWithDate.date);
        const month = date.getMonth();
        if (month !== lastMonth) {
          labels.push({
            name: monthNames[month],
            x: 30 + weekIdx * 12
          });
          lastMonth = month;
        }
      }
    });

    const filteredLabels = [];
    labels.forEach((label, i) => {
      if (i === 0 || label.x - filteredLabels[filteredLabels.length - 1].x >= 30) {
        filteredLabels.push(label);
      }
    });

    return filteredLabels;
  }, [activeData]);

  return (
    <div className="github-calendar-widget">
      <div className="calendar-top-bar">
        <span className="calendar-title">
          {activeData.totalContributions} contributions in {selectedYear === currentYear ? 'the last year' : selectedYear}
          {error && <span className="demo-badge" style={{ fontSize: '0.65rem', color: 'rgba(239, 68, 68, 0.8)', marginLeft: '6px' }}> (Demo Mode)</span>}
        </span>
        <div className="calendar-settings">
          <span>Contribution settings</span>
          <span className="arrow-down">▾</span>
        </div>
      </div>

      <div className="calendar-main-layout">
        <div className="calendar-border-box">
          <div className="heatmap-scroll-wrapper">
            <div className="heatmap-grid-container">
              <svg width={30 + activeData.contributions.length * 12} height="104" className="heatmap-svg">
                {/* Month labels */}
                {monthLabels.map((label, idx) => (
                  <text
                    key={idx}
                    x={label.x}
                    y="12"
                    fontSize="9"
                    fill="var(--text-muted)"
                    fontWeight="600"
                    className="month-label"
                  >
                    {label.name}
                  </text>
                ))}

                {/* Weekday labels */}
                <text x="0" y="32" fontSize="9" fill="var(--text-muted)" fontWeight="600" className="day-label">Mon</text>
                <text x="0" y="56" fontSize="9" fill="var(--text-muted)" fontWeight="600" className="day-label">Wed</text>
                <text x="0" y="80" fontSize="9" fill="var(--text-muted)" fontWeight="600" className="day-label">Fri</text>

                {/* Contribution Cells */}
                {activeData.contributions.map((week, weekIdx) => (
                  <g key={weekIdx} transform={`translate(${30 + weekIdx * 12}, 20)`}>
                    {week.map((day, dayIdx) => (
                      <rect
                        key={dayIdx}
                        y={dayIdx * 12}
                        width="10"
                        height="10"
                        rx="2"
                        ry="2"
                        fill={getCellColor(day.contributionLevel)}
                        className="heatmap-cell"
                      >
                        <title>{`${day.contributionCount} commits on ${formatDate(day.date)}`}</title>
                      </rect>
                    ))}
                  </g>
                ))}
              </svg>
            </div>
          </div>

          <div className="calendar-bottom-bar">
            <a href={`https://github.com/${username || 'harishvr22'}`} target="_blank" rel="noopener noreferrer" className="learn-more">
              Learn how we count contributions
            </a>
            <div className="heatmap-legend">
              <span>Less</span>
              <div className="legend-cells">
                <div className="legend-cell" style={{ backgroundColor: '#e5e7eb' }} />
                <div className="legend-cell" style={{ backgroundColor: '#9ca3af' }} />
                <div className="legend-cell" style={{ backgroundColor: '#6b7280' }} />
                <div className="legend-cell" style={{ backgroundColor: '#374151' }} />
                <div className="legend-cell" style={{ backgroundColor: '#000000' }} />
              </div>
              <span>More</span>
            </div>
          </div>
        </div>

        {/* Years selector list */}
        <div className="calendar-years-selector">
          {yearsList.map((year) => (
            <button
              key={year}
              className={`year-tab-btn ${selectedYear === year ? 'active' : ''}`}
              onClick={() => setSelectedYear(year)}
            >
              {year}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
