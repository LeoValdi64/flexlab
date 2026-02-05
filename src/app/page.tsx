"use client";

import { useState, useMemo, useCallback } from "react";
import {
  ArrowRight,
  ArrowDown,
  ArrowLeft,
  ArrowUp,
  Plus,
  Minus,
  Copy,
  Check,
  RotateCcw,
  Columns3,
  Rows3,
  LayoutGrid,
  AlignCenter,
  Sidebar,
} from "lucide-react";

type FlexDirection = "row" | "row-reverse" | "column" | "column-reverse";
type FlexWrap = "nowrap" | "wrap" | "wrap-reverse";
type JustifyContent =
  | "flex-start"
  | "flex-end"
  | "center"
  | "space-between"
  | "space-around"
  | "space-evenly";
type AlignItems =
  | "flex-start"
  | "flex-end"
  | "center"
  | "stretch"
  | "baseline";

interface FlexState {
  direction: FlexDirection;
  wrap: FlexWrap;
  justifyContent: JustifyContent;
  alignItems: AlignItems;
  gap: number;
}

interface Preset {
  name: string;
  icon: React.ReactNode;
  state: FlexState;
  itemCount: number;
}

const ITEM_COLORS = [
  "#6366f1",
  "#ec4899",
  "#f59e0b",
  "#10b981",
  "#3b82f6",
  "#8b5cf6",
  "#ef4444",
  "#14b8a6",
  "#f97316",
  "#06b6d4",
  "#84cc16",
  "#e879f9",
];

const DIRECTION_OPTIONS: { value: FlexDirection; label: string; icon: React.ReactNode }[] = [
  { value: "row", label: "row", icon: <ArrowRight size={14} /> },
  { value: "row-reverse", label: "row-reverse", icon: <ArrowLeft size={14} /> },
  { value: "column", label: "column", icon: <ArrowDown size={14} /> },
  { value: "column-reverse", label: "col-reverse", icon: <ArrowUp size={14} /> },
];

const WRAP_OPTIONS: { value: FlexWrap; label: string }[] = [
  { value: "nowrap", label: "nowrap" },
  { value: "wrap", label: "wrap" },
  { value: "wrap-reverse", label: "wrap-reverse" },
];

const JUSTIFY_OPTIONS: { value: JustifyContent; label: string }[] = [
  { value: "flex-start", label: "flex-start" },
  { value: "flex-end", label: "flex-end" },
  { value: "center", label: "center" },
  { value: "space-between", label: "space-between" },
  { value: "space-around", label: "space-around" },
  { value: "space-evenly", label: "space-evenly" },
];

const ALIGN_OPTIONS: { value: AlignItems; label: string }[] = [
  { value: "stretch", label: "stretch" },
  { value: "flex-start", label: "flex-start" },
  { value: "flex-end", label: "flex-end" },
  { value: "center", label: "center" },
  { value: "baseline", label: "baseline" },
];

const DEFAULT_STATE: FlexState = {
  direction: "row",
  wrap: "nowrap",
  justifyContent: "flex-start",
  alignItems: "stretch",
  gap: 12,
};

const PRESETS: Preset[] = [
  {
    name: "Navigation Bar",
    icon: <Columns3 size={16} />,
    state: {
      direction: "row",
      wrap: "nowrap",
      justifyContent: "space-between",
      alignItems: "center",
      gap: 16,
    },
    itemCount: 5,
  },
  {
    name: "Centered Card",
    icon: <AlignCenter size={16} />,
    state: {
      direction: "column",
      wrap: "nowrap",
      justifyContent: "center",
      alignItems: "center",
      gap: 16,
    },
    itemCount: 3,
  },
  {
    name: "Grid Gallery",
    icon: <LayoutGrid size={16} />,
    state: {
      direction: "row",
      wrap: "wrap",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      gap: 12,
    },
    itemCount: 9,
  },
  {
    name: "Sidebar Layout",
    icon: <Sidebar size={16} />,
    state: {
      direction: "row",
      wrap: "nowrap",
      justifyContent: "flex-start",
      alignItems: "stretch",
      gap: 0,
    },
    itemCount: 2,
  },
  {
    name: "Stacked List",
    icon: <Rows3 size={16} />,
    state: {
      direction: "column",
      wrap: "nowrap",
      justifyContent: "flex-start",
      alignItems: "stretch",
      gap: 8,
    },
    itemCount: 5,
  },
];

function ControlSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
        {label}
      </label>
      {children}
    </div>
  );
}

function OptionButton<T extends string>({
  value,
  current,
  onChange,
  icon,
  label,
}: {
  value: T;
  current: T;
  onChange: (v: T) => void;
  icon?: React.ReactNode;
  label: string;
}) {
  const active = value === current;
  return (
    <button
      onClick={() => onChange(value)}
      className={`flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-xs font-medium transition-all ${
        active
          ? "bg-accent text-white shadow-sm"
          : "bg-surface text-text-secondary hover:bg-surface-hover hover:text-text-primary"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

export default function Home() {
  const [flexState, setFlexState] = useState<FlexState>(DEFAULT_STATE);
  const [itemCount, setItemCount] = useState(5);
  const [copied, setCopied] = useState(false);
  const [activePreset, setActivePreset] = useState<number | null>(null);

  const update = useCallback(
    <K extends keyof FlexState>(key: K, value: FlexState[K]) => {
      setFlexState((prev) => ({ ...prev, [key]: value }));
      setActivePreset(null);
    },
    []
  );

  const generatedCSS = useMemo(() => {
    const lines = [
      ".container {",
      "  display: flex;",
    ];
    if (flexState.direction !== "row")
      lines.push(`  flex-direction: ${flexState.direction};`);
    if (flexState.wrap !== "nowrap")
      lines.push(`  flex-wrap: ${flexState.wrap};`);
    if (flexState.justifyContent !== "flex-start")
      lines.push(`  justify-content: ${flexState.justifyContent};`);
    if (flexState.alignItems !== "stretch")
      lines.push(`  align-items: ${flexState.alignItems};`);
    if (flexState.gap > 0) lines.push(`  gap: ${flexState.gap}px;`);
    lines.push("}");
    return lines.join("\n");
  }, [flexState]);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(generatedCSS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [generatedCSS]);

  const handleReset = useCallback(() => {
    setFlexState(DEFAULT_STATE);
    setItemCount(5);
    setActivePreset(null);
  }, []);

  const applyPreset = useCallback((index: number) => {
    const preset = PRESETS[index];
    setFlexState(preset.state);
    setItemCount(preset.itemCount);
    setActivePreset(index);
  }, []);

  const addItem = useCallback(() => {
    setItemCount((prev) => Math.min(prev + 1, 12));
  }, []);

  const removeItem = useCallback(() => {
    setItemCount((prev) => Math.max(prev - 1, 1));
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-background font-sans">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border px-6 py-3">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent">
            <LayoutGrid size={16} className="text-white" />
          </div>
          <h1 className="text-lg font-bold text-text-primary">FlexLab</h1>
          <span className="hidden text-sm text-text-muted sm:inline">
            Interactive CSS Flexbox Playground
          </span>
        </div>
        <button
          onClick={handleReset}
          className="flex items-center gap-1.5 rounded-md bg-surface px-3 py-1.5 text-xs font-medium text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
        >
          <RotateCcw size={13} />
          Reset
        </button>
      </header>

      {/* Main Content */}
      <div className="flex flex-1 flex-col lg:flex-row">
        {/* Left Panel - Controls */}
        <aside className="w-full shrink-0 overflow-y-auto border-b border-border p-5 lg:w-80 lg:border-r lg:border-b-0 xl:w-96">
          <div className="flex flex-col gap-6">
            {/* Presets */}
            <ControlSection label="Presets">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-2">
                {PRESETS.map((preset, i) => (
                  <button
                    key={preset.name}
                    onClick={() => applyPreset(i)}
                    className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-left text-xs font-medium transition-all ${
                      activePreset === i
                        ? "border-accent bg-accent-muted text-accent-hover"
                        : "border-border bg-surface text-text-secondary hover:border-border-light hover:bg-surface-hover hover:text-text-primary"
                    }`}
                  >
                    {preset.icon}
                    <span className="truncate">{preset.name}</span>
                  </button>
                ))}
              </div>
            </ControlSection>

            {/* Direction */}
            <ControlSection label="flex-direction">
              <div className="flex flex-wrap gap-1.5">
                {DIRECTION_OPTIONS.map((opt) => (
                  <OptionButton
                    key={opt.value}
                    value={opt.value}
                    current={flexState.direction}
                    onChange={(v) => update("direction", v)}
                    icon={opt.icon}
                    label={opt.label}
                  />
                ))}
              </div>
            </ControlSection>

            {/* Wrap */}
            <ControlSection label="flex-wrap">
              <div className="flex flex-wrap gap-1.5">
                {WRAP_OPTIONS.map((opt) => (
                  <OptionButton
                    key={opt.value}
                    value={opt.value}
                    current={flexState.wrap}
                    onChange={(v) => update("wrap", v)}
                    label={opt.label}
                  />
                ))}
              </div>
            </ControlSection>

            {/* Justify Content */}
            <ControlSection label="justify-content">
              <div className="flex flex-wrap gap-1.5">
                {JUSTIFY_OPTIONS.map((opt) => (
                  <OptionButton
                    key={opt.value}
                    value={opt.value}
                    current={flexState.justifyContent}
                    onChange={(v) => update("justifyContent", v)}
                    label={opt.label}
                  />
                ))}
              </div>
            </ControlSection>

            {/* Align Items */}
            <ControlSection label="align-items">
              <div className="flex flex-wrap gap-1.5">
                {ALIGN_OPTIONS.map((opt) => (
                  <OptionButton
                    key={opt.value}
                    value={opt.value}
                    current={flexState.alignItems}
                    onChange={(v) => update("alignItems", v)}
                    label={opt.label}
                  />
                ))}
              </div>
            </ControlSection>

            {/* Gap */}
            <ControlSection label={`gap: ${flexState.gap}px`}>
              <input
                type="range"
                min={0}
                max={48}
                step={2}
                value={flexState.gap}
                onChange={(e) => update("gap", Number(e.target.value))}
                className="w-full cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-text-muted">
                <span>0px</span>
                <span>48px</span>
              </div>
            </ControlSection>

            {/* Item Count */}
            <ControlSection label={`Items: ${itemCount}`}>
              <div className="flex items-center gap-2">
                <button
                  onClick={removeItem}
                  disabled={itemCount <= 1}
                  className="flex h-8 w-8 items-center justify-center rounded-md bg-surface text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <Minus size={14} />
                </button>
                <div className="flex-1 rounded-md bg-surface px-3 py-1.5 text-center text-sm font-mono font-medium text-text-primary">
                  {itemCount}
                </div>
                <button
                  onClick={addItem}
                  disabled={itemCount >= 12}
                  className="flex h-8 w-8 items-center justify-center rounded-md bg-surface text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary disabled:cursor-not-allowed disabled:opacity-30"
                >
                  <Plus size={14} />
                </button>
              </div>
            </ControlSection>

            {/* Generated CSS */}
            <ControlSection label="Generated CSS">
              <div className="relative rounded-lg border border-border bg-[#0d0f1a] p-4">
                <button
                  onClick={handleCopy}
                  className="absolute right-2 top-2 flex items-center gap-1 rounded-md bg-surface px-2 py-1 text-[10px] font-medium text-text-secondary transition-colors hover:bg-surface-hover hover:text-text-primary"
                >
                  {copied ? (
                    <>
                      <Check size={11} />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={11} />
                      Copy
                    </>
                  )}
                </button>
                <pre className="font-mono text-xs leading-relaxed text-text-secondary">
                  <code>{generatedCSS}</code>
                </pre>
              </div>
            </ControlSection>
          </div>
        </aside>

        {/* Right Panel - Preview */}
        <main className="flex flex-1 flex-col">
          <div className="flex items-center justify-between border-b border-border px-5 py-2.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
              Live Preview
            </span>
            <div className="flex items-center gap-3 text-xs text-text-muted">
              <span>
                {flexState.direction} / {flexState.wrap}
              </span>
            </div>
          </div>
          <div className="flex-1 overflow-auto p-5">
            <div
              className="min-h-[400px] w-full rounded-xl border border-border bg-surface/50 p-4"
              style={{
                display: "flex",
                flexDirection: flexState.direction,
                flexWrap: flexState.wrap,
                justifyContent: flexState.justifyContent,
                alignItems: flexState.alignItems,
                gap: `${flexState.gap}px`,
              }}
            >
              {Array.from({ length: itemCount }, (_, i) => {
                const color = ITEM_COLORS[i % ITEM_COLORS.length];
                const isColumn =
                  flexState.direction === "column" ||
                  flexState.direction === "column-reverse";
                return (
                  <div
                    key={i}
                    className="flex items-center justify-center rounded-lg font-mono text-sm font-bold text-white shadow-md transition-all duration-200"
                    style={{
                      backgroundColor: color,
                      minWidth: isColumn ? "100%" : "72px",
                      minHeight: isColumn ? "48px" : "72px",
                      width:
                        flexState.wrap === "wrap"
                          ? `calc(33.333% - ${flexState.gap * (2 / 3)}px)`
                          : undefined,
                      padding: "12px 16px",
                      boxShadow: `0 2px 8px ${color}40`,
                    }}
                  >
                    {i + 1}
                  </div>
                );
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
