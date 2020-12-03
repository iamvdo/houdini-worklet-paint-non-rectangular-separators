if (typeof registerPaint !== 'undefined') {
  class Separator {
    static get inputProperties() {
      return [
        'background-color',
        '--separator-shape',
        '--separator-shadow',
        '--separator-shadow-color',
      ];
    }

    paint(ctx, geom, props, args) {
      const color = String(props.get('background-color'));
      const shadowFactor = this.clamp(Number(props.get('--separator-shadow')), 0, 1);
      const shadowColor = String(props.get('--separator-shadow-color')) || 'rgba(0,0,0,.35)';
      const shape = String(props.get('--separator-shape')).trim() || 'curve-left';

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(geom.width, 0);

      if (shape === 'diagonal-left') {
        ctx.lineTo(geom.width, geom.height * shadowFactor);
        ctx.lineTo(0, geom.height);
      }
      if (shape === 'diagonal-right') {
        ctx.lineTo(geom.width, geom.height);
        ctx.lineTo(0, geom.height * shadowFactor);
      }
      if (shape === 'curve-left') {
        ctx.lineTo(geom.width, geom.height * shadowFactor);
        ctx.quadraticCurveTo(geom.width / 2, geom.height, 0, 0);
      }
      if (shape === 'curve-right') {
        ctx.quadraticCurveTo(geom.width / 2, geom.height, 0, geom.height * shadowFactor);
      }

      ctx.closePath();

      // fill
      ctx.fillStyle = color;
      ctx.fill();

      ctx.beginPath();

      if (shape === 'diagonal-left') {
        ctx.moveTo(geom.width, 0);
        ctx.lineTo(geom.width, geom.height * shadowFactor);
        ctx.lineTo(0, geom.height);
      }
      if (shape === 'diagonal-right') {
        ctx.moveTo(0, 0);
        ctx.lineTo(0, geom.height * shadowFactor);
        ctx.lineTo(geom.width, geom.height);
      }
      if (shape === 'curve-left') {
        ctx.moveTo(0, 0);
        ctx.quadraticCurveTo(geom.width / 2, geom.height, geom.width, geom.height * shadowFactor);
        ctx.lineTo(geom.width, 0);
        ctx.quadraticCurveTo(geom.width / 2, geom.height, 0, 0);
      }
      if (shape === 'curve-right') {
        ctx.moveTo(geom.width, 0);
        ctx.quadraticCurveTo(geom.width / 2, geom.height, 0, geom.height * shadowFactor);
        ctx.lineTo(0, 0);
        ctx.quadraticCurveTo(geom.width / 2, geom.height, geom.width, 0);
      }

      ctx.closePath();

      // fill
      ctx.fillStyle = shadowColor;
      ctx.fill();
    }

    clamp(val, min, max) {
      return Math.max(min, Math.min(max, val))
    }
  }

  registerPaint('separator', Separator);
}