using System;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Threading;

namespace MyApp
{
    /// <summary>
    /// マウス中ボタン押し込みでオートスクロールを有効にするヘルパー。
    /// 使い方: ルート要素の Loaded で AutoScrollHelper.AttachToWindow(this) を呼ぶ。
    /// 終了条件: 任意のマウスボタンクリック / Esc キー
    /// </summary>
    public static class AutoScrollHelper
    {
        private static ScrollViewer _activeViewer;
        private static Point _anchor;
        private static DispatcherTimer _timer;

        public static void AttachToWindow(FrameworkElement root)
        {
            if (root == null) return;
            root.PreviewMouseDown += Root_PreviewMouseDown;
        }

        private static void Root_PreviewMouseDown(object sender, MouseButtonEventArgs e)
        {
            if (e.ChangedButton != MouseButton.Middle) return;

            if (_activeViewer != null)
            {
                Stop();
                e.Handled = true;
                return;
            }

            var sv = FindAncestorScrollViewer(e.OriginalSource as DependencyObject);
            if (sv == null) return;

            Start(sv, e.GetPosition(sv));
            e.Handled = true;
        }

        private static void Start(ScrollViewer sv, Point anchor)
        {
            _activeViewer = sv;
            _anchor = anchor;

            try { Mouse.OverrideCursor = Cursors.ScrollAll; } catch { }

            if (_timer == null)
            {
                _timer = new DispatcherTimer(DispatcherPriority.Input)
                {
                    Interval = TimeSpan.FromMilliseconds(20)
                };
                _timer.Tick += Timer_Tick;
            }
            _timer.Start();

            var window = Window.GetWindow(sv);
            if (window != null)
            {
                window.PreviewMouseDown += Window_StopOnAnyClick;
                window.PreviewKeyDown += Window_StopOnEsc;
            }
        }

        private static void Stop()
        {
            try { Mouse.OverrideCursor = null; } catch { }
            _timer?.Stop();

            if (_activeViewer != null)
            {
                var window = Window.GetWindow(_activeViewer);
                if (window != null)
                {
                    window.PreviewMouseDown -= Window_StopOnAnyClick;
                    window.PreviewKeyDown -= Window_StopOnEsc;
                }
            }
            _activeViewer = null;
        }

        private static void Window_StopOnAnyClick(object sender, MouseButtonEventArgs e)
        {
            if (e.ChangedButton == MouseButton.Middle) return;
            Stop();
            e.Handled = true;
        }

        private static void Window_StopOnEsc(object sender, KeyEventArgs e)
        {
            if (e.Key == Key.Escape)
            {
                Stop();
                e.Handled = true;
            }
        }

        private static void Timer_Tick(object sender, EventArgs e)
        {
            if (_activeViewer == null)
            {
                _timer.Stop();
                return;
            }

            try
            {
                var pos = Mouse.GetPosition(_activeViewer);
                double dy = pos.Y - _anchor.Y;
                double dx = pos.X - _anchor.X;

                const double deadZone = 10.0;
                const double speedFactor = 0.05;

                if (Math.Abs(dy) > deadZone)
                {
                    double offset = _activeViewer.VerticalOffset
                        + (dy - Math.Sign(dy) * deadZone) * speedFactor;
                    _activeViewer.ScrollToVerticalOffset(offset);
                }

                if (Math.Abs(dx) > deadZone)
                {
                    double offset = _activeViewer.HorizontalOffset
                        + (dx - Math.Sign(dx) * deadZone) * speedFactor;
                    _activeViewer.ScrollToHorizontalOffset(offset);
                }
            }
            catch
            {
                // ScrollViewerが破棄された直後などは無視する。
            }
        }

        private static ScrollViewer FindAncestorScrollViewer(DependencyObject d)
        {
            while (d != null)
            {
                if (d is ScrollViewer sv) return sv;

                DependencyObject parent = null;
                try { parent = VisualTreeHelper.GetParent(d); } catch { }
                if (parent == null) parent = LogicalTreeHelper.GetParent(d);

                d = parent;
            }
            return null;
        }
    }
}
