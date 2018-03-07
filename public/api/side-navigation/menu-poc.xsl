<?xml version="1.0"?>
<!-- edited with XMLSpy v2010 rel. 3 sp1 (x64) (http://www.altova.com) by Shawn S Miller (private) -->
<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">
	<xsl:output method="xml" encoding="UTF-8" indent="yes"/>
	<xsl:variable name="menu-item-parent-class">dd-item dd3-item</xsl:variable>
	<xsl:template match="side-navigation">
		<ol class="dd-list">
			<xsl:apply-templates select="menu-item-parent"/>
		</ol>
	</xsl:template>
	<xsl:template match="menu-item-parent">
		<li>
			<xsl:if test="@menu-collapse">
				<xsl:attribute name="menu-collapse"><xsl:text>true</xsl:text></xsl:attribute>
			</xsl:if>
			<xsl:call-template name="data-attributes"/>
			<div class="dd-handle dd3-handle">Drag</div>
			<div class="dd3-content">
				<span>
					<xsl:value-of select="name"/>
				</span>
				<!--Call Template for Checkbox-->
				<!--<xsl:call-template name="checkbox"/>-->
			</div>
			<xsl:apply-templates select="menu-item"/>
			<xsl:if test="menu-item-parent">
				<ol class="dd-list">
					<xsl:apply-templates select="menu-item-parent"/>
				</ol>
			</xsl:if>
		</li>
	</xsl:template>
	<xsl:template match="menu-item">
		<ol class="dd-list">
			<xsl:call-template name="item"/>
		</ol>
	</xsl:template>
	<xsl:template name="item">
		<li class="dd-item dd3-item" data-id="1" genid="{generate-id(menu-item)}">
			<xsl:call-template name="data-attributes"/>
			<xsl:if test="@menu-collapse">
				<xsl:attribute name="menu-collapse"><xsl:text>true</xsl:text></xsl:attribute>
			</xsl:if>
			<div class="dd-handle dd3-handle">Drag</div>
			<div class="dd3-content">
				<span>
					<xsl:value-of select="name"/>
				</span>
				<!--Call Template for Checkbox-->
				<xsl:call-template name="slider"/>
			</div>
		</li>
	</xsl:template>
	<xsl:template name="slider">
		<span class="pull-right">
			<span class="onoffswitch">
				<input type="checkbox" name="start_interval" class="onoffswitch-checkbox" id="{generate-id(name)}"/>
				<label class="onoffswitch-label" for="{generate-id(name)}">
					<span class="onoffswitch-inner" data-swchon-text="ON" data-swchoff-text="OFF"/>
					<span class="onoffswitch-switch"/>
				</label>
			</span>
		</span>
	</xsl:template>
	<xsl:template name="checkbox">
		<div class="pull-right">
			<div class="checkbox no-margin">
				<label>
					<input type="checkbox" class="checkbox style-0" checked="checked"/>
					<span class="font-xs">Is Enabled</span>
				</label>
			</div>
		</div>
	</xsl:template>
	<xsl:template name="data-attributes">
		<xsl:attribute name="class"><xsl:text>dd-item dd3-item</xsl:text></xsl:attribute>
		<xsl:attribute name="data-id"><xsl:number value="position()" format="1"/></xsl:attribute>
		<xsl:attribute name="data-isActive"><xsl:text>true</xsl:text></xsl:attribute>
		<xsl:if test="surl">
			<xsl:attribute name="data-sUrl"><xsl:value-of select="surl"/></xsl:attribute>
		</xsl:if>
		<xsl:attribute name="data-icon"><xsl:value-of select="icon"/></xsl:attribute>
		<xsl:if test="name">
			<xsl:attribute name="data-name"><xsl:value-of select="name"/></xsl:attribute>
		</xsl:if>
		<xsl:if test="key">
			<xsl:attribute name="data-key"><xsl:value-of select="key"/></xsl:attribute>
		</xsl:if>
	</xsl:template>
</xsl:stylesheet>
